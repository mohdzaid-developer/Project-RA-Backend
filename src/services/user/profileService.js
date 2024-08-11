import logger from "../../logger/index.js";
import { HttpStatusCodes } from "../../constants/statusCode.js";
import * as Auth from "../../db/db_comands/user/authentication.js";

const TAG = "user.profile.service";

export async function addNewImage(user) {
    logger.info(`${TAG}.addNewImage() ==> `, user);
    const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
    try {
      if(user?.forget){
        serviceResponse.message = "invalid request with unauthorized token";
        serviceResponse.statusCode = HttpStatusCodes.UNAUTHORIZED;
        serviceResponse.data = null;
        return serviceResponse;
      }
      const existedUser = await Auth.checkEmailOrPhoneExist(user?.oldData?.email);
      if (existedUser) {
        const res = await Auth.findAndUpdateImage({ ...user });
        serviceResponse.message = "image Uploaded Successfully !";
        serviceResponse.statusCode = HttpStatusCodes.OK;
        serviceResponse.data = res;
        return serviceResponse;
      } else {
        serviceResponse.message = "invalid !";
        serviceResponse.statusCode = HttpStatusCodes.NOT_FOUND;
      }
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.addNewImage`, error);
      serviceResponse.error =
        "Failed to create admin due to technical difficulties";
    }
    return serviceResponse;
  }

export async function getProfileData(user) {
    logger.info(`${TAG}.getProfileData() ==> `, user);
    const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
    try {
      const existedUser = await Auth.checkEmailOrPhoneExist(user?.email);
      if (existedUser) {
        let {fullName,email,profilePic,phone}=existedUser[0]
        serviceResponse.statusCode = HttpStatusCodes.OK;
        serviceResponse.data ={fullName,email,phone,profilePic};
        return serviceResponse;
      } else {
        serviceResponse.message = "invalid !";
        serviceResponse.statusCode = HttpStatusCodes.NOT_FOUND;
      }
    } catch (error) {
      logger.error(`ERROR occurred in ${TAG}.getProfileData`, error);
      serviceResponse.error =
        "Failed to create admin due to technical difficulties";
    }
    return serviceResponse;
  }