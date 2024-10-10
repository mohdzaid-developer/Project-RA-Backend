import Payment from "../../../models/payment/paymentModule.js";
import BookingSchema from "../../../models/booking/bookingSchema.js";
import UserAuthModule from "../../../models/user/authModel.js";

export const savePaymentDetails = async (data) => {
  const payment = new Payment({ ...data });

  console.log("jjjjjjjjjjjjjjjjjjjjjjjjjj")
  console.log(data)
  try {
    let res = await payment.save();
    await UserAuthModule.updateOne(
      { _id: data?.user_id },
      { $set: { isBooked: true } }
    );
    await BookingSchema.updateMany(
      { order_id: data?.order_id },
      { $set: { status: "Booked",paid_amount:3000 } }
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
    if (data?.type=="customUpdate") {
      response = await BookingSchema.updateMany(
        { _id: data._id },
        {
          $set: {
            total_amount: data?.total_amount,
            start_date: data?.start_date,
            end_date: data?.end_date,
            status: "pending",
            order_id: data?.order_id,
          },
        }
      );
    } else {
      response = await BookingSchema.updateOne(
        { _id: data.bookingId },
        { $set: { status: data?.status } }
      );
    }
    return response;
  } catch (error) {
    return error;
  }
};

export const getAllBooking = async (filter) => {
  try {
    let pagination={
      pageNum:filter?.pageNum,
      pageSize:filter?.pageSize
    }
    delete filter.pageNum
    delete filter.pageSize
    const totalResultsCount = await BookingSchema.countDocuments(filter);
    let response;
    if (filter?.status == "request") {
      response = await BookingSchema.find({
        ...filter,
        status: "request",
      })
        .sort({
          createdAt: -1,
        })
        .skip((pagination?.pageNum - 1) * pagination?.pageSize)
        .limit(pagination?.pageSize);
    } else {
      if (filter?.bookingId != null) {
        response = await BookingSchema.find({
          _id: filter?.bookingId,
        })
          .sort({
            createdAt: -1,
          })
          .skip((pagination?.pageNum - 1) * pagination?.pageSize)
          .limit(pagination?.pageSize);
      } else {
        response = await BookingSchema.find({
          ...filter,
          status: { $ne: "request" },
        })
          .sort({ createdAt: -1 })
          .skip((pagination?.pageNum - 1) * pagination?.pageSize)
          .limit(pagination?.pageSize);
      }
    }

    return { data: response, totalResultsCount };
  } catch (error) {
    return error;
  }
};

export const getAllPayments = async (filter) => {
  try {
    let pagination={
      pageNum:filter?.pageNum??1,
      pageSize:filter?.pageSize??10
    }

    delete filter.pageNum
    delete filter.pageSize
    const totalResultsCount = await Payment.countDocuments(filter);
    const response = await Payment.find(filter)
      .sort({
        createdAt: -1,
      })
      .skip((pagination?.pageNum - 1) * pagination?.pageSize)
      .limit(pagination?.pageSize);
    return { data: response, totalResultsCount };
  } catch (error) {
    return error;
  }
};

export const getAllUsers = async (filter) => {
  try {
    let pagination={
      pageNum:filter?.pageNum??1,
      pageSize:filter?.pageSize??10
    }

    delete filter.pageNum
    delete filter.pageSize
    const totalResultsCount = await UserAuthModule.countDocuments(filter);
    const response = await UserAuthModule.find(filter)
      .sort({
        createdAt: -1,
      })
      .skip((pagination?.pageNum - 1) * pagination?.pageSize)
      .limit(pagination?.pageSize);
    return { data: response, totalResultsCount };
  } catch (error) {
    return error;
  }
};
