import * as APIPaths from '../../constants/apiPaths.js';
import {Router} from 'express';
import AuthRoutes from './adminRoutes/index.js';
import userRoutes from './userRoutes/index.js';

const router = Router();

router.use(APIPaths.ROUTER_ADMIN, AuthRoutes);
router.use(APIPaths.ROUTER_USER, userRoutes);


export default router;
