import * as contactController from "../../../controller/contact/contactController.js";
import { Router } from "express";
import {
  isAuthenticated,
  isAdmin,
} from "../../../middleware/isAuthenticate.js";
const router = Router();

// Contact Us routes
router
  .route("/contact-us")
  .post(contactController.saveContactDetails)
  .get(isAdmin,contactController.getContactDetails);

// Newsletter routes
router
  .route("/news-letter")
  .post(contactController.saveNewsLetter)
  .get(isAdmin,contactController.getNewsLetter);

export default router;
