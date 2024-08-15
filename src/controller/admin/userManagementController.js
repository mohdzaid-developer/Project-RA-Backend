import { responseBuilder } from "../../helper/response.js";
import log from "../../logger/index.js";
import * as useManagement from "../../services/admin/userManagementServices.js";

const TAG = "controller.userManagementController";

export async function getAllUser(req, res, next) {
  try {
    log.info(TAG + `.getAllUser()`);
    log.debug(`signup object = ${JSON.stringify(req.body)}`);
    const {isBooked} = req.query;
    const filter = {};
    if (isBooked && isBooked != "") filter.isBooked = isBooked;
    const authResponse = await useManagement.getAllUser(filter);
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.getAllUser()`, error);
    next(error);
  }
}
