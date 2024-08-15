// saveContactDetailsDetail
import { responseBuilder } from "../../helper/response.js";
import log from "../../logger/index.js";
import * as generalServices from "../../services/general/generalServices.js"

const TAG = "controller.payment";

export async function saveContactDetailsDetail(req, res, next) {
  try {
    log.info(TAG + `.saveContactDetailsDetail ()`);
    log.debug(`signup object = ${JSON.stringify(req.body)}`);
    const authResponse = await generalServices.saveContactDetailsDetail({...req.body});
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.saveContactDetailsDetail ()`, error);
    next(error);
  }
}

export async function getContactDetailsDetails(req, res, next) {
  try {
    log.info(TAG + `.getContactDetailsDetails ()`);
    log.debug(`signup object = ${JSON.stringify(req.body)}`);
    const authResponse = await generalServices.getContactDetailsDetails({...req.body});
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.getContactDetailsDetails ()`, error);
    next(error);
  }
}