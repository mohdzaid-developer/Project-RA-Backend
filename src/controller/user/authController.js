import { responseBuilder } from "../../helper/response.js";
import log from "../../logger/index.js";
import * as authService from "../../services/user/authServices.js";

const TAG = "controller.userAuth";

export async function createUser(req, res, next) {
  try {
    log.info(TAG + `.createUser()`);
    log.debug(`signup object = ${JSON.stringify(req.body)}`);
    const user = req.body;
    const authResponse = await authService.createUser(user);
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.createUser()`, error);
    next(error);
  }
}

export async function loginUser(req, res, next) {
  try {
    log.info(TAG + `.loginUser()`);
    log.debug(`signup object = ${JSON.stringify(req.body)}`);
    const user = req.body;
    const authResponse = await authService.loginUser(user);
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.loginUser()`, error);
    next(error);
  }
}

export async function changePassword(req, res, next) {
  try {
    log.info(TAG + `.changePassword()`);
    log.debug(`signup object = ${JSON.stringify(req.body)}`);
    const user = req.body;
    const oldData = req.userSession;
    const authResponse = await authService.changePassword({
      ...user,
      ...oldData,
      email: oldData.email,
    });
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.changePassword()`, error);
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

export async function forgotPassword(req, res, next) {
  try {
    log.info(TAG + `.forgotPassword()`);
    log.debug(`signup object = ${JSON.stringify(req.body)}`);
    const user = req.body;
    const authResponse = await authService.forgotPassword(user);
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.forgotPassword()`, error);
    next(error);
  }
}
