import * as paymentController from "../../../controller/payment/paymentController.js";
import { Router } from "express";
import { isAuthenticated } from "../../../middleware/isAuthenticate.js";
const router = Router();

router.post("/create-order", isAuthenticated, paymentController.createOrder);
router.post(
  "/verify-payment",
  isAuthenticated,
  paymentController.verifyPaymentAndSave
);
router.patch(
  "/booking",
  isAuthenticated,
  paymentController.updateBookingStatus
);
router.get(
  "/booking",
  paymentController.getAllBooking
);
router.get(
  "/",
  paymentController.getAllPayments
);

export default router;
