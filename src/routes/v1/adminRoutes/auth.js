import * as adminAuthController from "../../../controller/admin/adminAuth.js";
import { Router } from "express";
import { isAdmin } from "../../../middleware/isAuthenticate.js";
const router = Router();

router.route("/signup").post(adminAuthController.createAdmin);
router.route("/login").post(adminAuthController.loginUser);
router.route('/otp').post(isAdmin,adminAuthController.otpVerify);
router.route("/otp-resend").post(isAdmin, adminAuthController.otpResend);

export default router;
