import logger from "../../logger/index.js";
import { hashPassword, comparePasswords } from "../../helper/encryption.js";
import * as adminAuth from "../../db/db_comands/admin/auth_connection.js";
import { HttpStatusCodes } from "../../constants/statusCode.js";
import {
  generateAccessToken,
  generateJWT,
} from "../../helper/authentication.js";
import { sendSMS } from "../../constants/sendSMS.js";
import otpGenerator from "otp-generator";
const TAG = "auth.service";

export async function createAdmin(user) {
  logger.info(`${TAG}.createAdmin() ==> `, user);

  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
  try {
    const existedUser = await adminAuth.checkEmailOrPhoneExist(user.email);
    if (existedUser?.length > 0) {
      serviceResponse.message = "Email or Phone already exists";
      serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
      return serviceResponse;
    } else {
      let otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        specialChars: false,
      });
      user.generatedPassword = await hashPassword(otp);
      const accessToken = await generateJWT(
        { ...user, otp, otpType: "register", role: "admin" },
        200,
        process.env.JWT_ACCESS_TOKEN_SECRET
      );
      const refreshToken = await generateJWT(
        { ...user, otpType: "register", role: "admin" },
        3600,
        process.env.JWT_ACCESS_TOKEN_SECRET
      );
      await sendSMS({ otp, email: user.email });
      logger.debug("saved user::" + user);
      serviceResponse.data = {
        message: "please check your email for verification code.",
        accessToken,
        refreshToken,
      };
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.createAdmin`, error);
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}

export async function otpResend(user) {
  logger.info(`${TAG}.otpResend() ==> `, user);

  const serviceResponse = { statusCode: HttpStatusCodes.OK };
  try {
    if (!user) {
      serviceResponse.message = "token expired";
      serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
      return serviceResponse;
    } else {
      if (user) {
        if (user?.otpType == "register") {
          let otp = otpGenerator.generate(4, {
            upperCaseAlphabets: false,
            specialChars: false,
          });
          const accessToken = await generateJWT(
            {
              ...user,
              otp,
            },
            200,
            process.env.JWT_ACCESS_TOKEN_SECRET
          );
          const refreshToken = await generateJWT(
            {
              ...user,
            },
            3600,
            process.env.JWT_ACCESS_TOKEN_SECRET
          );
          await sendSMS({ otp, email: user.email });
          serviceResponse.message = "resend successfully !";
          serviceResponse.data = {
            accessToken,
            refreshToken,
            email: user.email,
            otp:otp
          };
        }else{
          const existedUser = await adminAuth.checkEmailOrPhoneExist(user.email);
          if (existedUser) {
            let otp = otpGenerator.generate(4, {
              upperCaseAlphabets: false,
              specialChars: false,
            });
            user.generatedPassword = await hashPassword(otp);
            const accessToken = await generateJWT(
              { ...user, otp, otpType: false, role: "admin" },
              200,
              process.env.JWT_ACCESS_TOKEN_SECRET
            );
            const refreshToken = await generateJWT(
              { ...user, otpType: false, role: "admin" },
              3600,
              process.env.JWT_ACCESS_TOKEN_SECRET
            );
            await adminAuth.findAndUpdate({ ...user, isValid: true });
            await sendSMS({ otp, email: user.email });
            logger.debug("saved user::" + user);
            serviceResponse.data = {
              message: "please check your email for verification code.",
              accessToken,
              refreshToken,
            };
          }
        }
        return serviceResponse;
      }
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.otpResend`, error);
    serviceResponse.statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    serviceResponse.error =
      "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}

export async function otpVerify(user) {
  logger.info(`${TAG}.otpVerify() ==> `, user);
  const serviceResponse = { statusCode: HttpStatusCodes.CREATED };
  try {
    if (!user) {
      serviceResponse.message = "token expired";
      serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
      return serviceResponse;
    } else {
      if (user && user.oldData && user.otp) {
        if (user.oldData.otp == user.otp) {
          if (user.oldData.otpType == "register") {
            let res = await adminAuth.createAdmin({
              ...user.oldData,
              isValid: false,
            });
            logger.debug("saved user::" + user);
            serviceResponse.data = {
              message: "registered successfully !.",
              ...res,
            };
          } else {
            const existedUser = await adminAuth.checkEmailOrPhoneExist(
              user.oldData.email
            );
            const isGeneratedPasswordCorrect = await comparePasswords(
              existedUser?.generatedPassword,
              user.otp
            );
            if (isGeneratedPasswordCorrect) {
              const accessToken = await generateAccessToken({
                id: existedUser._id,
                email: existedUser.email,
                role: "admin"
              });
              serviceResponse.statusCode = HttpStatusCodes.OK;
              serviceResponse.data = {
                accessToken,
                isLogin:true
              };
            } else {
              serviceResponse.message = "invalid otp 1!";
              serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
            }
          }
        } else {
          logger.debug("saved user::" + user);
          serviceResponse.data = {
            message: "invalid otp !.",
          };
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

export async function loginUser(user) {
  logger.info(`${TAG}.loginAdmin() ==> `, user);
  const serviceResponse = { statusCode: HttpStatusCodes.OK };
  try {
    const existedUser = await adminAuth.checkEmailOrPhoneExist(user.email, { projection: { _id: 1 } });
    if (existedUser) {
      let otp = otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        specialChars: false,
      });
      user.generatedPassword = await hashPassword(otp);
            const tokenPromise = generateJWT(
        { ...user, otp, otpType: false, role: "admin" },
        200,
        process.env.JWT_ACCESS_TOKEN_SECRET
      );
      const refreshTokenPromise = generateJWT(
        { ...user, otpType: false, role: "admin" },
        3600,
        process.env.JWT_ACCESS_TOKEN_SECRET
      );

      // Update user and send SMS in parallel
      const updatePromise = adminAuth.findAndUpdate({ ...user, isValid: true });
      const smsPromise = sendSMS({ otp, email: user.email });

      // const [token] = await Promise.all([tokenPromise]);
      await Promise.all([updatePromise, smsPromise]);

      logger.debug("saved user::" + user);
      serviceResponse.data = {
        message: "please check your email for verification code.",
        accessToken:tokenPromise,
        refreshToken:refreshTokenPromise
      };
    } else {
      serviceResponse.message = "invalid email !";
      serviceResponse.statusCode = HttpStatusCodes.BAD_REQUEST;
      serviceResponse.data = null;
    }
  } catch (error) {
    logger.error(`ERROR occurred in ${TAG}.loginAdmin`, error);
    serviceResponse.error = "Failed to create admin due to technical difficulties";
  }
  return serviceResponse;
}
