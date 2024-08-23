import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  payment_id: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
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
  amount: {
    type: Number,
    required: true,
  },
  order_id: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: "USD",
  },
  transaction_type: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Completed", "Failed","paid"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

paymentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Payment = mongoose.model("PaymentDetails", paymentSchema);

export default Payment;
