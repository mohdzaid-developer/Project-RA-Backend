import UserAuthModule from "../../../models/user/authModel.js";

export const createUser = async (data) => {
  try {
    let res = await UserAuthModule.create({ ...data });
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
      { _id: data._id }, // Filter to match the document you want to update
      { $set: { ...data } } // Update fields using $set operator
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
      { $set: { ...data } }
    );
    return res;
  } catch (error) {
    return error;
  }
};
