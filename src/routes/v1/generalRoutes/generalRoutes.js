import * as generalController from "../../../controller/general/generalController.js";
import { Router } from "express";
import { isAuthenticated } from "../../../middleware/isAuthenticate.js";
const router = Router();

router.post("/contact-us", generalController.saveContactDetailsDetail);
router.get("/contact-us",  generalController.getContactDetailsDetails);

export default router;
