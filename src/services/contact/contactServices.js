import logger from "../../logger/index.js";
import { HttpStatusCodes } from "../../constants/statusCode.js";
import * as contactDb from "../../db/db_comands/contact/contactDb.js";

const TAG = "payment.service";

export async function saveContactDetails(data) {
  logger.info(`${TAG}.saveContactDetailsDetail() ==> `, data);
  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
  try {
    let response = await contactDb?.saveContactDetails(data);
    serviceResponse.statusCode = HttpStatusCodes.CREATED;
    serviceResponse.data = {
      message: "Details submitted successfully.",
      success: true,
      response,
    };
    return serviceResponse;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveContactDetailsDetail`, error);
    serviceResponse.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}

export async function getContactDetails(filter) {
  logger.info(`${TAG}.getContactDetailsDetails() ==> `);
  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
  try {
    let response = await contactDb?.getContactDetails(filter);
    serviceResponse.statusCode = HttpStatusCodes.CREATED;
    serviceResponse.data =response;
    return serviceResponse;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.getContactDetailsDetails`, error);
    serviceResponse.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}

export async function saveNewsLetter(data) {
  logger.info(`${TAG}.saveNewsLetter() ==> `, data);
  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
  try {
    let response = await contactDb?.saveNewsLetter(data);
    serviceResponse.statusCode = HttpStatusCodes.CREATED;
    serviceResponse.data = {
      message: "Details submitted successfully.",
      success: true,
      response,
    };
    return serviceResponse;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.saveNewsLetter`, error);
    serviceResponse.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}


export async function getNewsLetter(filter) {
  logger.info(`${TAG}.getNewsLetter() ==> `,);
  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
  try {
    let response = await contactDb?.getNewsLetter(filter);
    serviceResponse.statusCode = HttpStatusCodes.CREATED;
    serviceResponse.data =response
    return serviceResponse;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.getNewsLetter`, error);
    serviceResponse.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
    }
  return serviceResponse;
}
