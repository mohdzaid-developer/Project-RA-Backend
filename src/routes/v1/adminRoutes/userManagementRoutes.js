import * as userManagement from "../../../controller/admin/userManagementController.js";
import { Router } from "express";
import { isAdmin } from "../../../middleware/isAuthenticate.js";
const router = Router();

router.route("/user").get(userManagement.getAllUser);

export default router;
