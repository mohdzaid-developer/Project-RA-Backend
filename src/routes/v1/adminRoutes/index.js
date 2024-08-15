import * as APIPaths from "../../../constants/apiPaths.js";
import { Router } from "express";
import AuthRoutes from "./auth.js";
import ManagementRoutes from "./userManagementRoutes.js";

const router = Router();

router.use(APIPaths.ROUTER_AUTH, AuthRoutes);
router.use(APIPaths.ROUTER_MANAGEMENT, ManagementRoutes);

export default router;
