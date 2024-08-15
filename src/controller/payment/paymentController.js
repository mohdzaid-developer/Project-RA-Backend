import { responseBuilder } from "../../helper/response.js";
import log from "../../logger/index.js";
import * as paymentServices from "../../services/payment/paymentService.js"

const TAG = "controller.payment";

export async function createOrder(req, res, next) {
  try {
    log.info(TAG + `.createOrder ()`);
    log.debug(`signup object = ${JSON.stringify(req.body)}`);
    const user = req.body;
    const authResponse = await paymentServices.createOrder({
      ...user,
      id: req.userSession.id,
      email: req.userSession.email,
    });
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.createOrder ()`, error);
    next(error);
  }
}

export async function verifyPaymentAndSave(req, res, next) {
  try {
    log.info(TAG + `.verifyPaymentAndSave()`);
    log.debug(`signup object = ${JSON.stringify(req.body)}`);
    const authResponse = await paymentServices.verifyPaymentAndSave({
      ...req.body,
      id: req.userSession.id,
      email: req.userSession.email,
    });
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.verifyPaymentAndSave()`, error);
    next(error);
  }
}

export async function updateBookingStatus(req, res, next) {
  try {
    log.info(TAG + `.updateBookingStatus()`);
    log.debug(`signup object = ${JSON.stringify(req.body)}`);
    const {bookingStatus:status,id}=req.query
    const authResponse = await paymentServices.updateBookingStatus({status,id});
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.updateBookingStatus()`, error);
    next(error);
  }
}

export async function getAllBooking(req, res, next) {
  const { plan, package: selectedDestination, destination, id } = req.query;
  try {
    log.info(TAG + `.getAllBooking()`);
    log.debug(`signup object = ${JSON.stringify(req.body)}`);
    const filter = {};
    if (plan && plan != "") filter.plan = plan;
    if (selectedDestination && selectedDestination != "")
      filter.package = selectedDestination;
    if (destination && destination != "") filter.destination = destination;
    if(id && id !="")filter.order_id=id

    const authResponse = await paymentServices.getAllBooking(filter);
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.getAllBooking()`, error);
    next(error);
  }
}

export async function getAllPayments(req, res, next) {
  const { plan, package: selectedDestination, destination,id } = req.query;
  try {
    log.info(TAG + `.getAllPayments()`);
    log.debug(`signup object = ${JSON.stringify(req.body)}`);
    const filter = {};
    if (plan && plan != "") filter.plan = plan;
    if (selectedDestination && selectedDestination != "")
      filter.package = selectedDestination;
    if (destination && destination != "") filter.destination = destination;
    if(id && id !="")filter.orderId=id

    const authResponse = await paymentServices.getAllPayments(filter);
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.getAllPayments()`, error);
    next(error);
  }
}

