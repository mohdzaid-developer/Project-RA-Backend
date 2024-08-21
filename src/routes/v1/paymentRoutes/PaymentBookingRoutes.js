import * as paymentController from "../../../controller/booking-payment/paymentBookingController.js";
import { Router } from "express";
import {
  isAdmin,
  isAuthenticated,
} from "../../../middleware/isAuthenticate.js";
const router = Router();

router.post("/create-order", isAuthenticated, paymentController.createOrder);
router
  .route("/create-custom-order")
  .post(isAuthenticated, paymentController.createCustomOrder)
  .patch(isAuthenticated, paymentController.updateCustomOrder);

router.post(
  "/verify-payment-booking",
  isAuthenticated,
  paymentController.verifyPaymentAndSave
);
router.patch(
  "/booking",
  isAuthenticated,
  paymentController.updateBookingStatus
);
router.get("/booking", paymentController.getAllBooking);
router.get("/user/booking", isAuthenticated, paymentController.getAllMyBooking);
router.get("/payment", paymentController.getAllPayments);

export default router;
