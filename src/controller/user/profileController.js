import { responseBuilder } from "../../helper/response.js";
import log from "../../logger/index.js";
import * as profileService from "../../services/user/profileService.js";

const TAG = "controller.userProfile";

export async function addNewImage(req, res, next) {
  try {
    log.info(TAG + `.addNewImage()`);
    log.debug(`signup object = ${JSON.stringify(req.body)}`);
    const imageBuffer = { file: { buffer: "" }, ...req };
    const oldData = req.userSession;
    if (imageBuffer) {
      if (imageBuffer.file) {
        const authResponse = await profileService.addNewImage({
          profilePic: imageBuffer.file.buffer,
          ...oldData,
        });
        responseBuilder(authResponse, res, next, req);
      }
    }
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.addNewImage()`, error);
    next(error);
  }
}

export async function getProfileData(req, res, next) {
  try {
    log.info(TAG + `.getProfileData()`);
    log.debug(`signup object = ${JSON.stringify(req.body)}`);
    const oldData = req.userSession;
    const authResponse = await profileService.getProfileData({
      ...oldData
    });
    responseBuilder(authResponse, res, next, req);
  } catch (error) {
    log.error(`ERROR occurred in ${TAG}.getProfileData()`, error);
    next(error);
  }
}
