import contactUsModel from "../../../models/general/contactUsModule.js";
export const saveContactDetailsDetails = async (data) => {
    const booking = new contactUsModel({ ...data });
    try {
      await booking.save();
      return res;
    } catch (error) {
      return error;
    }
  };
  //getContactDetailsDetails

  
export const getContactDetailsDetail = async () => {
  try {
    const response = await contactUsModel.find();
    return response;
  } catch (error) {
    return error;
  }
};