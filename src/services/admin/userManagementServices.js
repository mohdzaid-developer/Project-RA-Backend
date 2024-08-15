import logger from "../../logger/index.js";
import * as useManagement from "../../db/db_comands/payment/payment.js";
import { HttpStatusCodes } from "../../constants/statusCode.js";

const TAG = "admin.userManagementController.service";

export async function getAllUser(filter) {
  logger.info(`${TAG}.getAllUser() ==> `, filter);

  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
  try {
    const existedUser = await useManagement.getAllUsers(filter);
    if (existedUser) {
      logger.debug("saved user::" + filter);
      serviceResponse.data =existedUser

      return serviceResponse;
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.getAllUser`, error);
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}