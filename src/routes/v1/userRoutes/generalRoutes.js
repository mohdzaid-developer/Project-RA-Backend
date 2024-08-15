import * as authController from "../../../controller/user/authController.js"
import { Router } from 'express';
const router = Router();

router.route('/signup').post(authController.createUser);

export default router