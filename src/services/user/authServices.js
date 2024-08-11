import logger from "../../logger/index.js";
import { hashPassword, comparePasswords } from "../../helper/encryption.js";
import * as Auth from "../../db/db_comands/user/authentication.js";
import { HttpStatusCodes } from "../../constants/statusCode.js";
import {
  generateAccessToken,
  generateJWT,
} from "../../helper/authentication.js";
import { sendSMS } from "../../constants/sendSMS.js";
import otpGenerator from "otp-generator";

const TAG = "auth.service";

export async function createUser(user) {
  logger.info(`${TAG}.createUser() ==> `, user);

  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
  try {
    user.password = await hashPassword(user.password);

    const existedUser = await Auth.checkEmailOrPhoneExist(user.email,user.phone);
    if (existedUser?.length>0) {
      serviceResponse.message = "Email or Phone already exists";
      serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
      return serviceResponse;
    } else {
      let otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        specialChars: false,
      });
      const accessToken = await generateJWT(
        { ...user, otp, newCreating: true },
        200,
        process.env.JWT_ACCESS_TOKEN_SECRET
      );
      const refreshToken = await generateJWT(
        { ...user, newCreating: true },
        3600,
        process.env.JWT_ACCESS_TOKEN_SECRET
      );
      await sendSMS({ otp, email: user.email });
            logger.debug("saved user::" + user);
            serviceResponse.data = {
              message: "check email !.",
              accessToken,
              refreshToken
            };
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.createUser`, error);
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}

export async function otpVerify(user) {
  logger.info(`${TAG}.otpVerify() ==> `, user);

  const serviceResponse = { statusCode: HttpStatusCodes.BAD_REQUEST };
  try {
    if (!user) {
      serviceResponse.message = "token expired";
      serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
      return serviceResponse;
    } else {
      if (user && user.oldData && user.otp) {
        if (user.oldData.otp == user.otp) {
          if (user.oldData.newCreating == true) {
            let res = await Auth.createUser({ ...user.oldData });
            logger.debug("saved user::" + user);
            serviceResponse.statusCode = HttpStatusCodes.CREATED;
            serviceResponse.data = {
              message: "registered successfully !.",
              ...res,
            };
          } else {
            const accessToken = await generateJWT(
              { id: user.oldData.id, email: user.oldData.email },
              6000,
              process.env.JWT_ACCESS_TOKEN_SECRET
            );
            logger.debug("saved user::" + user);
            serviceResponse.statusCode = HttpStatusCodes.CREATED;
            serviceResponse.data = {
              message: "please set new password.",
              accessToken,
              changePassword:true
            };
          }
        } else {
          logger.debug("saved user::" + user);
          serviceResponse.message = "invalid otp !.";
          serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
        }
      }
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.createUser`, error);
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}

export async function otpResend(user) {
  logger.info(`${TAG}.otpResend() ==> `, user);

  const serviceResponse = { statusCode: HttpStatusCodes.BAD_REQUEST };
  try {
    if (!user) {
      serviceResponse.message = "token expired";
      serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
      return serviceResponse;
    } else {
      if (user) {
        const {fullName,email,phone,password,newCreating}=user
        let otp = otpGenerator.generate(4, {
          upperCaseAlphabets: false,
          specialChars: false,
        });
        const accessToken = await generateJWT(
          {
            fullName,email,phone,password,newCreating,otp,
          },
          200,
          process.env.JWT_ACCESS_TOKEN_SECRET
        );
        const refreshToken = await generateJWT(
          {
            fullName,email,phone,password,newCreating
          },
          3600,
          process.env.JWT_ACCESS_TOKEN_SECRET
        );
        await sendSMS({ otp, email: user.email });
        serviceResponse.message = "resend successfully !";
        serviceResponse.statusCode = HttpStatusCodes.CREATED;
        serviceResponse.data = {
          accessToken,
          refreshToken,
          email: user.email,
        };
        return serviceResponse;
      }
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.otpResend`, error);
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}

export async function loginUser(user) {
  logger.info(`${TAG}.loginUser() ==> `, user);
  const serviceResponse = { statusCode: HttpStatusCodes.OK };
  try {
    const existedUser = await Auth.checkEmailOrPhoneExist(user.email);
    if (existedUser.length>0) {
      const isPasswordCorrect = await comparePasswords(
        existedUser[0]?.password,
        user.password
      );
      if (isPasswordCorrect) {
        const token = await generateAccessToken({
          id: existedUser[0]._id,
          email: existedUser[0].email,
        });
        serviceResponse.statusCode = HttpStatusCodes.OK;
        serviceResponse.data = {
          token,
        };
      } else {
        serviceResponse.message = "wrong password !";
        serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
      }
    } else {
      serviceResponse.message = "invalid email !";
      serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
      serviceResponse.data = null;
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.loginUser`, error);
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}

export async function changePassword(user) {
  logger.info(`${TAG}.changePassword() ==> `, user);
  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
  try {
    if(user?.forget){
      serviceResponse.message = "invalid request with unauthorized token";
      serviceResponse.statusCode = HttpStatusCodes.UNAUTHORIZED;
      serviceResponse.data = null;
      return serviceResponse;
    }
    const existedUser = await Auth.checkEmailOrPhoneExist(user.email);
    if (existedUser) {
      user.password = await hashPassword(user.password);
      const res = await Auth.findAndUpdate({ ...user });
      serviceResponse.message = "password changed !";
      serviceResponse.statusCode = HttpStatusCodes.OK;
      serviceResponse.data = res;
      return serviceResponse;
    } else {
      serviceResponse.message = "invalid !";
      serviceResponse.statusCode = HttpStatusCodes.NOT_FOUND;
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.changePassword`, error);
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}

export async function forgotPassword(user) {
  logger.info(`${TAG}.forgotPassword() ==> `, user);

  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
  try {
    const existedUser = await Auth.checkEmailOrPhoneExist(user.email);
    if (existedUser.length==0) {
      serviceResponse.message = "invalid email !";
      serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
      return serviceResponse;
    } else {
      let otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        specialChars: false,
      });
      const accessToken = await generateJWT(
        { id: existedUser[0]?._id, email: existedUser[0]?.email, otp, new: false ,forget:true},
        300,
        process.env.JWT_ACCESS_TOKEN_SECRET
      );
      const refreshToken = await generateJWT(
        { ...user, new: false,forget:true },
        3600,
        process.env.JWT_ACCESS_TOKEN_SECRET
      );

      await sendSMS({ otp, email: user.email });
      logger.debug("saved user::" + user);
      serviceResponse.data = {
        message: "please check your Email for otp.",
        accessToken,
        refreshToken,
      };
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.forgotPassword`, error);
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}
