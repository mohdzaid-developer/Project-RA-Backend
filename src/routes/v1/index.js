import * as APIPaths from '../../constants/apiPaths.js';
import {Router} from 'express';
import AuthRoutes from './adminRoutes/index.js';
import userRoutes from './userRoutes/index.js';
import paymentBookingRoutes from './paymentRoutes/PaymentBookingRoutes.js';
import contactRoutes from './contactRoutes/contactRoutes.js';

const router = Router();

router.use(APIPaths.ROUTER_ADMIN, AuthRoutes);
router.use(APIPaths.ROUTER_USER, userRoutes);
router.use("/", paymentBookingRoutes);
router.use("/", contactRoutes);


export default router;
