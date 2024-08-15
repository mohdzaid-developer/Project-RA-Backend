import logger from "../../logger/index.js";
import { HttpStatusCodes } from "../../constants/statusCode.js";
import { getContactDetailsDetail, saveContactDetailsDetails } from "../../db/db_comands/general/general.js";

const TAG = "payment.service";

export async function saveContactDetailsDetail(data) {
  logger.info(`${TAG}.saveContactDetailsDetail() ==> `, data);
  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
  try {
    let response = await saveContactDetailsDetails(data);
    serviceResponse.statusCode = HttpStatusCodes.CREATED;
    serviceResponse.data = {
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

export async function getContactDetailsDetails() {
  logger.info(`${TAG}.getContactDetailsDetails() ==> `,);
  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
  try {
    let response = await getContactDetailsDetail();
    serviceResponse.statusCode = HttpStatusCodes.CREATED;
    serviceResponse.data = {
      response,
    };
    return serviceResponse;
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.getContactDetailsDetails`, error);
    serviceResponse.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}