import * as APIPaths from '../../constants/apiPaths.js';
import {Router} from 'express';
import AuthRoutes from './adminRoutes/index.js';
import userRoutes from './userRoutes/index.js';
import paymentBookingRoutes from './paymentRoutes/PaymentBookingRoutes.js';
import generalRoutes from './generalRoutes/generalRoutes.js';

const router = Router();

router.use(APIPaths.ROUTER_ADMIN, AuthRoutes);
router.use(APIPaths.ROUTER_USER, userRoutes);
router.use("/", paymentBookingRoutes);
router.use("/", generalRoutes);


export default router;
