import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  client_name:{
    type:String,
    required: true
  },
  email:{
    type:String,
    required: true
  },
  phone:{
    type:String,
    required: true
  },
  order_id: {
    type:String,
    // required: true
  },
  destination: {
    type: String,
    required: true
  },
  package: {
    type: String,
    required: true
  },
  plan: {
    type: String,
    required: true
  },
  booked_date: {
    type: Date,
    default: Date.now
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  no_of_adults: {
    type: Number,
    required: true
  },
  no_of_children: {
    type: Number,
  },
  total_amount: {
    type: Number,
  },
  paid_amount: {
    type: Number,
  },
  status: {
    type: String,
  }
});

const Booking = mongoose.model('BookingDetails', bookingSchema);

export default Booking;
