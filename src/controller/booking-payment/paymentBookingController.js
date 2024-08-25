import { responseBuilder } from "../../helper/response.js";
import log from "../../logger/index.js";
import * as paymentServices from "../../services/booking-payment/paymentBookingService.js";

const TAG = "controller.payment";

export async function createOrder(req, res, next) {
  try {
    log.info(TAG + `.createOrder ()`);
    log.debug(`createOrder object = ${JSON.stringify(req.body)}`);
    const user = req.body;
    let authResponse;
    authResponse = await paymentServices.createOrder({
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

export async function createCustomOrder(req, res, next) {
  try {
    log.info(TAG + `.createCustomOrder ()`);
    log.debug(`signup object = ${JSON.stringify(req.body)}`);
    const user = req.body;
    let authResponse;
    authResponse = await paymentServices.createCustomOrder({
      ...user,
      id: req.userSession.id,
      email: req.userSession.email,
    });

    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.createCustomOrder ()`, error);
    next(error);
  }
}

export async function updateCustomOrder(req, res, next) {
  try {
    log.info(TAG + `.updateCustomOrder ()`);
    log.debug(`updateCustomOrder object = ${JSON.stringify(req.body)}`);
    const user = req.body;
    let authResponse;
    authResponse = await paymentServices.updateCustomOrder({
      ...user
    });

    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.updateCustomOrder()`, error);
    next(error);
  }
}

export async function getCustomOrder(req, res, next) {
  try {
    log.info(TAG + `.getCustomOrder ()`);
    log.debug(`getCustomOrder object = ${JSON.stringify(req.body)}`);
    const user = req.userSession;
    let authResponse;
    authResponse = await paymentServices.getCustomOrder({
      ...user
    });

    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.getCustomOrder()`, error);
    next(error);
  }
}

export async function capturePayment(req, res, next) {
  try {
    log.info(TAG + `.captureOrder()`);
    const authResponse = await paymentServices.capturePayment(req);
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.captureOrder()`, error);
    next(error);
  }
}

export async function updateBookingStatus(req, res, next) {
  try {
    log.info(TAG + `.updateBookingStatus()`);
    log.debug(`signup object = ${JSON.stringify(req.body)}`);
    const { bookingStatus: status, bookingId } = req.query;
    const authResponse = await paymentServices.updateBookingStatus({
      status,
      bookingId,
    });
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.updateBookingStatus()`, error);
    next(error);
  }
}

export async function getAllBooking(req, res, next) {
  const {
    plan,
    package: selectedDestination,
    destination,
    id,
    status,
    bookingId,
    pageNum,
    pageSize
  } = req.query;
  console.log(req.query.bookingId)
  try {
    log.info(TAG + `.getAllBooking()`);
    log.debug(`signup object = ${JSON.stringify(req.body)}`);
    const filter = {pageNum:1,pageSize:10};
    if (plan && plan != "") filter.plan = plan;
    if (selectedDestination && selectedDestination != "")
      filter.package = selectedDestination;
    if (destination && destination != "") filter.destination = destination;
    if (id && id != "") filter.order_id = id;
    if (status && status != "") filter.status = status;
    if (bookingId && bookingId != "") filter.bookingId = bookingId;
    if(pageNum && pageNum !="")filter.pageNum = pageNum;
    if(pageSize && pageSize !="")filter.pageSize = pageSize;

    const authResponse = await paymentServices.getAllBooking(filter);
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.getAllBooking()`, error);
    next(error);
  }
}

export async function getAllMyBooking(req, res, next) {
  try {
    log.info(TAG + `.getAllBooking()`);
    log.debug(`signup object = ${JSON.stringify(req.body)}`);
    const {
      pageNum,
      pageSize,
      bookingId
    } = req.query;
    const filter = {pageNum:1,pageSize:10};
    if (bookingId && bookingId != "") filter._id = bookingId;
    if(pageNum && pageNum !="")filter.pageNum = pageNum;
    if(pageSize && pageSize !="")filter.pageSize = pageSize;
    
    const authResponse = await paymentServices.getAllBooking({
      user_id: req.userSession.id,
    });
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.getAllBooking()`, error);
    next(error);
  }
}

export async function getAllPayments(req, res, next) {
  const { plan, package: selectedDestination, destination, id,pageNum,pageSize } = req.query;
  try {
    log.info(TAG + `.getAllPayments()`);
    log.debug(`signup object = ${JSON.stringify(req.body)}`);
    const filter = {pageNum:1,pageSize:10};
    if (plan && plan != "") filter.plan = plan;
    if (selectedDestination && selectedDestination != "")
      filter.package = selectedDestination;
    if (destination && destination != "") filter.destination = destination;
    if (id && id != "") filter.orderId = id;
    if(pageNum && pageNum !="")filter.pageNum = pageNum;
    if(pageSize && pageSize !="")filter.pageSize = pageSize;

    const authResponse = await paymentServices.getAllPayments(filter);
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.getAllPayments()`, error);
    next(error);
  }
}
