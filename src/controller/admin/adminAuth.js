import { responseBuilder } from "../../helper/response.js";
import log from "../../logger/index.js";
import * as authService from "../../services/admin/adminAuthSrvices.js";

const TAG = "controller.adminAuth";

export async function createAdmin(req, res, next) {
  try {
    log.info(TAG + `.createAdmin()`);
    log.debug(`signup object = ${JSON.stringify(req.body)}`);
    const user = req.body;
    const authResponse = await authService.createAdmin({ ...user });
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.createAdmin()`, error);
    next(error);
  }
}

export async function otpResend(req, res, next) {
  try {
    log.info(TAG + `.otpResend()`);
    log.debug(`signup object = ${JSON.stringify(req.body)}`);
    const oldData = req.userSession;
    const authResponse = await authService.otpResend({ ...oldData });
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.otpResend()`, error);
    next(error);
  }
}

export async function otpVerify(req, res, next) {
  try {
    log.info(TAG + `.otpVerify()`);
    log.debug(`signup object = ${JSON.stringify(req.body)}`);
    const oldData = req.userSession;
    const authResponse = await authService.otpVerify({
      oldData,
      otp: req.body.otp,
    });
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.otpVerify()`, error);
    next(error);
  }
}


export async function loginUser(req, res, next) {
  try {
    log.info(TAG + `.loginAdmin()`);
    log.debug(`signIn object = ${JSON.stringify(req.body)}`);
    const user = req.body;
    const authResponse = await authService.loginUser(user);
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.loginAdmin()`, error);
    next(error);
  }
}