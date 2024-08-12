import { Router } from "express";
import multer from "multer"
import { addNewImage,getProfileData} from "../../../controller/user/profileController.js";
import { isAuthenticated } from "../../../middleware/isAuthenticate.js";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.route("").post(isAuthenticated,addNewImage)
router.route("/").get(isAuthenticated,getProfileData)
// router.route("/:thumbnail/:user_uid/").post(upload.single('image'),addNewImage)
// router.route("/:image_uid").get(getImage)
// router.route("/:image_uid").delete(deleteImages)

export default router