import Payment from "../../../models/payment/paymentModule.js";
import BookingSchema from "../../../models/booking/bookingSchema.js";
import UserAuthModule from "../../../models/user/authModel.js";

export const savePaymentDetails = async (data) => {
  const payment = new Payment({
    paymentId: data?.paymentId,
    userId: data?.id,
    amount: data.amount,
    currency: data.currency,
    paymentMethod: "Razorpay",
    status: "Completed",
    orderId: data?.order_id,
    email:data?.email,
    phone:data?.phone,
    client_name:data?.client_name
  });
  try {
    await payment.save();
    await UserAuthModule.updateOne(
      { _id: data?.id },
      { $set: { isBooked:true } } 
    );
    await BookingSchema.updateOne(
      { order_id: data?.order_id },
      { $set: { status:"Booked" } }
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const saveBookingDetails = async (data) => {
  const booking = new BookingSchema({ ...data });
  try {
    await booking.save();
    return res;
  } catch (error) {
    return error;
  }
};

export const findAndUpdateBookingStatus = async (data) => {
  console.log("dddddddddddddddddddddddddddddddddddddd")
  console.log(data)
  try {
    let res = await BookingSchema.updateOne(
      { order_id: data.id },
      { $set: { status:data?.status } }
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const getAllBooking = async (filter) => {
  try {
    const response = await BookingSchema.find(filter);
    return response;
  } catch (error) {
    return error;
  }
};

export const getAllPayments = async (filter) => {
  try {
    const response = await Payment.find(filter);
    return response;
  } catch (error) {
    return error;
  }
};

export const getAllUsers = async (filter) => {
  try {
    const response = await UserAuthModule.find(filter);
    return response;
  } catch (error) {
    return error;
  }
};
