import Payment from "../../../models/payment/paymentModule.js";
import Booking from "../../../models/booking/bookingSchema.js";
export const savePaymentDetails = async (data) => {
  const payment = new Payment({
    paymentId: data?.paymentId,
    userId: data?.id,
    amount: data.amount,
    currency: data.currency,
    paymentMethod: "Razorpay",
    status: "Completed",
    orderId: data?.order_id,
  });
  try {
    await payment.save();
    return res;
  } catch (error) {
    return error;
  }
};

export const saveBookingDetails = async (data) => {
  const booking = new Booking({ ...data });
  try {
    await booking.save();
    return res;
  } catch (error) {
    return error;
  }
};

export const findAndUpdateBookingStatus = async (data) => {
  try {
    let res = await Booking.updateOne(
      { order_id: data.order_id },
      { $set: { ...data } }
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const getAllBooking = async (filter) => {
  try {
    const response = await Booking.find(filter);
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
