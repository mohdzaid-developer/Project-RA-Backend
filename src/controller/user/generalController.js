import { responseBuilder } from "../../helper/response.js";
import log from "../../logger/index.js";
import * as authService from "../../services/user/authServices.js";

const TAG = "controller.userAuth";

export async function postContactUs(req, res, next) {
    try {
      log.info(TAG + `.postContactUs()`);
      log.debug(`signup object = ${JSON.stringify(req.body)}`);
      const user = req.body;
      const authResponse = await authService.createUser(user);
      responseBuilder(authResponse, res, next, req);
    } catch (error) {
      log.error(`ERROR occurred in ${TAG}.postContactUs()`, error);
      next(error);
    }
}