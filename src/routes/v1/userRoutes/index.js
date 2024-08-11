import * as APIPaths from '../../../constants/apiPaths.js';
import {Router} from 'express';
import AuthRoutes from './authRoutes.js';
import ProfileRoutes from './profileRoutes.js'

const router = Router();

// router.use(APIPaths.ROUTER_ADMIN, AuthRoutes);
router.use(APIPaths.ROUTER_AUTH, AuthRoutes);
router.use(APIPaths.ROUTER_PROFILE, ProfileRoutes);


export default router;
