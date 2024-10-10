import logger from "../../logger/index.js";
import { HttpStatusCodes } from "../../constants/statusCode.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import * as paymentAndBookingDb from "../../db/db_comands/payment/payment.js";
import { checkEmailOrPhoneExist } from "../../db/db_comands/user/authentication.js";
import {
  adminBookingConfirmSMS,
  bookingConfirmSMS,
  customBookingConfirmSMS,
} from "../../constants/sendSMS.js";
import { generateAccessToken } from "../../helper/authentication.js";

const TAG = "payment.service";

export async function createOrder(user) {
  logger.info(`${TAG}.createOrder() ==> `, user);

  const razorpayInstance = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY,
    key_secret: process.env.RAZOR_PAY_SECRET,
  });
  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
  if (!user) {
    serviceResponse.message = "invalid request with unauthorized token";
    serviceResponse.statusCode = HttpStatusCodes.UNAUTHORIZED;
    serviceResponse.data = null;
    return serviceResponse;
  }

  const existedUser = await checkEmailOrPhoneExist(user?.email);
  if (existedUser?.length == 0) {
    serviceResponse.message = "Invalid User";
    serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
    return serviceResponse;
  }
  function isAtLeastOneMonthAfter(selectedDateStr) {
    const currentDate = new Date();
    const selectedDate = new Date(selectedDateStr);
    const oneMonthAfter = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      currentDate.getDate(),
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds(),
      currentDate.getMilliseconds()
    );
    return selectedDate >= oneMonthAfter;
  }

  let correctDateOrNot = await isAtLeastOneMonthAfter(user?.start_date);
  if (correctDateOrNot == false) {
    serviceResponse.message =
      "the one month of time required plz select date one month after.";
    serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
    return serviceResponse;
  }
  const { currency, receipt } = user;
  try {
    const options = {
      amount: 3000 * 100,
      currency,
      receipt,
    };
    const order = await razorpayInstance.orders.create(options);
    if (order) {
      let response = await paymentAndBookingDb?.saveBookingDetails({
        ...user,
        order_id: order?.id,
        status: "pending",
        user_id: user?.id,
        phone: existedUser[0]?.phone,
        client_name: existedUser[0]?.fullName,
        email: existedUser[0]?.email,
      });
      serviceResponse.message = "order Created Success Fully !";
      serviceResponse.statusCode = HttpStatusCodes.CREATED;
      serviceResponse.data = {
        success: true,
        ...order,
        response,
      };
      return serviceResponse;
    } else {
      serviceResponse.message = "invalid !";
      serviceResponse.statusCode = HttpStatusCodes.NOT_FOUND;
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.createOrder`, error);
    serviceResponse.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}

export async function createCustomOrder(user) {
  logger.info(`${TAG}.createCustomOrder() ==> `, user);
  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
  if (!user) {
    serviceResponse.message = "invalid request with unauthorized token";
    serviceResponse.statusCode = HttpStatusCodes.UNAUTHORIZED;
    serviceResponse.data = null;
    return serviceResponse;
  }

  const existedUser = await checkEmailOrPhoneExist(user?.email);
  if (existedUser?.length == 0) {
    serviceResponse.message = "Invalid User";
    serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
    return serviceResponse;
  }
  try {
    let response = await paymentAndBookingDb?.saveBookingDetails({
      ...user,
      status: "request",
      user_id: user?.id,
      phone: existedUser[0]?.phone,
      client_name: existedUser[0]?.fullName,
      email: existedUser[0]?.email,
    });
    serviceResponse.message = "Custom Order Request Created SuccessFully !";
    serviceResponse.statusCode = HttpStatusCodes.CREATED;
    serviceResponse.data = {
      success: true,
      response,
    };
    return serviceResponse;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.createCustomOrder`, error);
    serviceResponse.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}

export async function updateCustomOrder(user) {
  logger.info(`${TAG}.updateCustomOrder() ==> `, user);
  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
  const razorpayInstance = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY,
    key_secret: process.env.RAZOR_PAY_SECRET,
  });
  try {
    const options = {
      amount: 3000 * 100,
      // currency:"INR"
      // receipt,
    };

    const order = await razorpayInstance.orders.create(options);
    const accessToken = await generateAccessToken({
      bookingId: user?._id,
    });
    let response = await paymentAndBookingDb?.findAndUpdateBookingStatus({
      ...user,
      order_id:order?.id,
      status: "pending",
      type:"customUpdate"
    });
    await customBookingConfirmSMS({
      email: user?.email,
      accessToken,
      plan: user?.plan,
      destination: user?.destination,
      package: user?.package,
    });
    serviceResponse.message = "Custom Order Request Created SuccessFully !";
    serviceResponse.statusCode = HttpStatusCodes.CREATED;
    serviceResponse.data = {
      success: true,
      response,
    };
    return serviceResponse;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.updateCustomOrder`, error);
    serviceResponse.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}

export async function capturePayment(req) {
  logger.info(`${TAG}.capturePayment() ==> `, req);
  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };

  try {
    const shasum = crypto.createHmac("sha256",process.env.RAZOR_PAY_SECRET);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    let response = await paymentAndBookingDb?.getAllBooking({
      order_id: req.body.payload.payment.entity.order_id,
    });
    let res=await paymentAndBookingDb?.savePaymentDetails({
      user_id: response?.data[0]?.user_id,
      order_id: req.body.payload.payment.entity.order_id,
      payment_id: req.body.payload.payment.entity.id,
      transaction_type: req.body.payload.payment.entity.method,
      currency: req.body.payload.payment.entity.currency,
      phone: response?.data[0]?.phone,
      client_name: response?.data[0]?.client_name,
      email: response?.data[0]?.email,
      amount: req.body.payload.payment.entity.amount,
      status: "paid",
    });

    await bookingConfirmSMS(response?.data[0]);
    // await adminBookingConfirmSMS({ ...response?.data[0]});
    return serviceResponse;
  } catch (error) {
    serviceResponse.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    logger.error(`ERROR occurred in ${TAG}.capturePayment`, error);
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}

export async function updateBookingStatus(data) {
  logger.info(`${TAG}.updateBookingStatus() ==> `, data);
  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
  try {
    let response = await paymentAndBookingDb?.findAndUpdateBookingStatus(data);
    serviceResponse.message = "Booking Status Updated Successfully !.";
    serviceResponse.data = response;
  } catch (error) {
    serviceResponse.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    logger.error(`ERROR occurred in ${TAG}.updateBookingStatus`, error);
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}

export async function getAllBooking(filter) {
  logger.info(`${TAG}.getAllBooking() ==> `, filter);
  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
  try {
    let response = await paymentAndBookingDb?.getAllBooking(filter);
    serviceResponse.message = "booked list Fetched Successfully.";
    serviceResponse.data = response;
  } catch (error) {
    serviceResponse.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    logger.error(`ERROR occurred in ${TAG}.getAllBooking`, error);
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}

export async function getCustomOrder(filter) {
  logger.info(`${TAG}.getCustomOrder() ==> `, filter);
  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
  try {
    let response = await paymentAndBookingDb?.getAllBooking({
      _id: filter?.bookingId,
    });

    if (response?.data[0]?.status != "pending") {
      serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
      serviceResponse.message = "Already Booked !";
    } else {
      serviceResponse.message = "booked list Fetched Successfully.";
      serviceResponse.data = response?.data;
    }
  } catch (error) {
    serviceResponse.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    logger.error(`ERROR occurred in ${TAG}.getCustomOrder`, error);
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}

export async function getAllPayments(filter) {
  logger.info(`${TAG}.getAllPayments() ==> `, filter);
  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
  try {
    let response = await paymentAndBookingDb?.getAllPayments(filter);
    serviceResponse.message = "all payment list Fetched Successfully.";
    serviceResponse.data = response;
  } catch (error) {
    serviceResponse.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    logger.error(`ERROR occurred in ${TAG}.getAllPayments`, error);
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}
