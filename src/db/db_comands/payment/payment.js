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
    email: data?.email,
    phone: data?.phone,
    client_name: data?.client_name,
  });
  try {
    await payment.save();
    await UserAuthModule.updateOne(
      { _id: data?.id },
      { $set: { isBooked: true } }
    );
    await BookingSchema.updateOne(
      { order_id: data?.order_id },
      { $set: { status: "Booked" } }
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const saveBookingDetails = async (data) => {
  const booking = new BookingSchema({ ...data });
  try {
    let res = await booking.save();
    return res;
  } catch (error) {
    return error;
  }
};

export const findAndUpdateBookingStatus = async (data) => {
  try {
    let response;
    if (data?._id) {
      response = await BookingSchema.updateMany(
        { _id: data._id },
        {
          $set: {
            total_amount: data?.total_amount,
            start_date: data?.start_date,
            end_date: data?.end_date,
            status: "pending",
          },
        }
      );
    } else {
      response = await BookingSchema.updateOne(
        { order_id: data.id },
        { $set: { status: data?.status } }
      );
    }
    console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu")
    return response;
  } catch (error) {
    return error;
  }
};

export const getAllBooking = async (filter) => {
  try {
    let response;
    if (filter?.status == "request") {
      response = await BookingSchema.find({ status: "request" }).sort({
        createdAt: -1,
      });
    } else {
      response = await BookingSchema.find({
        ...filter,
        status: { $ne: "request" },
      }).sort({ createdAt: -1 });
    }
    return response;
  } catch (error) {
    return error;
  }
};

export const getAllPayments = async (filter) => {
  try {
    const response = await Payment.find(filter).sort({ createdAt: -1 });
    return response;
  } catch (error) {
    return error;
  }
};

export const getAllUsers = async (filter) => {
  try {
    const response = await UserAuthModule.find(filter).sort({ createdAt: -1 });
    return response;
  } catch (error) {
    return error;
  }
};
