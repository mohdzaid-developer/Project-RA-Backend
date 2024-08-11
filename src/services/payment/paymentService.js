import logger from "../../logger/index.js";
import { HttpStatusCodes } from "../../constants/statusCode.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import * as paymentAndBookingDb from "../../db/db_comands/payment/payment.js";

const TAG = "payment.service";

const razorpayInstance = new Razorpay({
  key_id: "rzp_test_e6zf5ZgkpupNAu",
  key_secret: "WeRnyn9uXXOidBHRsvgLRb97",
});

export async function createOrder(user) {
  logger.info(`${TAG}.createOrder() ==> `, user);
  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
  if (!user) {
    serviceResponse.message = "invalid request with unauthorized token";
    serviceResponse.statusCode = HttpStatusCodes.UNAUTHORIZED;
    serviceResponse.data = null;
    return serviceResponse;
  }
  const { amount, currency, receipt } = user;
  try {
    const options = {
      amount: amount * 100,
      currency,
      receipt,
      payment_capture: 1,
    };

    const order = await razorpayInstance.orders.create(options);
    if (order) {
      let response = await paymentAndBookingDb?.saveBookingDetails({
        ...user?.bookingDetails,
        order_id: order?.id,
        status: "pending",
        user_id: user?.id,
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

export async function verifyPaymentAndSave(user) {
  logger.info(`${TAG}.verifyPaymentAndSave() ==> `, user);
  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
  if (!user) {
    serviceResponse.message = "invalid request with unauthorized token";
    serviceResponse.statusCode = HttpStatusCodes.UNAUTHORIZED;
    serviceResponse.data = null;
    return serviceResponse;
  }

  try {
    const expectedSignature = crypto
      .createHmac("sha256", "WeRnyn9uXXOidBHRsvgLRb97")
      .update(user?.orderId + "|" + user?.paymentId)
      .digest("hex");
    if (expectedSignature === user?.signature) {
      await paymentAndBookingDb?.savePaymentDetails({ ...user });
      await paymentAndBookingDb?.findAndUpdateBookingStatus({status:"confirmed"});
      serviceResponse.message = "Payment verified and saved.";
      serviceResponse.data = {
        success: true,
      };
      return serviceResponse;
    } else {
      serviceResponse.message = "invalid !";
      serviceResponse.statusCode = HttpStatusCodes.NOT_FOUND;
    }
  } catch (error) {
    serviceResponse.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    logger.error(`ERROR occurred in ${TAG}.verifyPaymentAndSave`, error);
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}

export async function getAllBooking(filter) {
  logger.info(`${TAG}.getAllBooking() ==> `, filter);
  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
  try {
    //getAllBooking
   let response=await paymentAndBookingDb?.getAllBooking(filter);
   serviceResponse.message = "booked list Fetched Successfully.";
   serviceResponse.data =response
  } catch (error) {
    serviceResponse.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    logger.error(`ERROR occurred in ${TAG}.getAllBooking`, error);
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}

export async function getAllPayments(filter) {
  logger.info(`${TAG}.getAllPayments() ==> `, filter);
  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
  try {
    //getAllBooking
   let response=await paymentAndBookingDb?.getAllPayments(filter);
   serviceResponse.message = "all payment list Fetched Successfully.";
   serviceResponse.data =response
  } catch (error) {
    serviceResponse.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    logger.error(`ERROR occurred in ${TAG}.getAllPayments`, error);
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}

