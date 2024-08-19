// saveContactDetailsDetail
import { responseBuilder } from "../../helper/response.js";
import log from "../../logger/index.js";
import * as generalServices from "../../services/contact/contactServices.js"

const TAG = "controller.payment";

export async function saveContactDetails(req, res, next) {
  try {
    log.info(TAG + `.saveContactDetailsDetail ()`);
    log.debug(`signup object = ${JSON.stringify(req.body)}`);
    const authResponse = await generalServices.saveContactDetails({...req.body});
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.saveContactDetailsDetail ()`, error);
    next(error);
  }
}

export async function getContactDetails(req, res, next) {
  try {
    log.info(TAG + `.getContactDetailsDetails ()`);
    const authResponse = await generalServices.getContactDetails();
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.getContactDetailsDetails ()`, error);
    next(error);
  }
}



export async function saveNewsLetter(req, res, next) {
  try {
    log.info(TAG + `.saveNewsLetter ()`);
    log.debug(`saveNewsLetter object = ${JSON.stringify(req.body)}`);
    const authResponse = await generalServices.saveNewsLetter({...req.body});
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.saveNewsLetter ()`, error);
    next(error);
  }
}

export async function getNewsLetter(req, res, next) {
  try {
    log.info(TAG + `.getNewsLetter ()`);
    const authResponse = await generalServices.getNewsLetter();
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.getNewsLetter ()`, error);
    next(error);
  }
}