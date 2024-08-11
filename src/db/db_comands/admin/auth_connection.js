import logger from '../../../logger/index.js';
import Admin from '../../../models/Admin/Authentication.js';

export const createAdmin = async (data) => {
  try {
      let admin = await Admin.create({...data})
      return data;
  } catch (error) {
    return error
  }
};

export const checkEmailOrPhoneExist=async(data)=>{
    try {
        let res = await Admin.findOne({ email: data });
        return res;
    } catch (error) {
      return error
    }
   
}


export const findAndUpdate = async (data) => {
  try {
    return await Admin.updateOne(
      { email: data.email },
      { $set: { ...data } }
    );
  } catch (error) {
    logger.error('Error in findAndUpdate:', error);
    throw error;
  }
}