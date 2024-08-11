import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: "USD",
  },
//   paymentMethod: {
//     type: String,
//     required: true,
//     enum: ["Credit Card", "Debit Card", "PayPal", "Bank Transfer", "Other"],
//   },
//   cardDetails: {
//     cardNumber: {
//       type: String,
//       required: function () {
//         return (
//           this.paymentMethod === "Credit Card" ||
//           this.paymentMethod === "Debit Card"
//         );
//       },
//     },
//     cardHolderName: {
//       type: String,
//       required: function () {
//         return (
//           this.paymentMethod === "Credit Card" ||
//           this.paymentMethod === "Debit Card"
//         );
//       },
//     },
//     expiryDate: {
//       type: String,
//       required: function () {
//         return (
//           this.paymentMethod === "Credit Card" ||
//           this.paymentMethod === "Debit Card"
//         );
//       },
//     },
//     cvv: {
//       type: String,
//       required: function () {
//         return (
//           this.paymentMethod === "Credit Card" ||
//           this.paymentMethod === "Debit Card"
//         );
//       },
//     },
//   },
  status: {
    type: String,
    required: true,
    enum: ["Pending", "Completed", "Failed"],
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

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
