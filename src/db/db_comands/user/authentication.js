import UserAuthModule from "../../../models/user/authModel.js";

export const createUser = async (data) => {
  try {
    let res = await UserAuthModule.create({ ...data,isBooked:false });
    return res;
  } catch (error) {
    return error;
  }
};

export const checkEmailOrPhoneExist = async (email, phone) => {
  try {
    let res = await UserAuthModule.find({
      $or: [{ email: email }, { phone: phone }],
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const findAndUpdate = async (data) => {
  try {
    let res = await UserAuthModule.updateOne(
      { _id: data._id },
      { $set: { ...data } } 
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const findAndUpdateImage = async (data) => {
  try {
    let res = await UserAuthModule.updateOne(
      { _id: data.id },
      { $set: { profilePic: data?.profilePic } }
    );
    return res;
  } catch (error) {
    return error;
  }
};
