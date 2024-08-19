import contactUsModel from "../../../models/contact/contactUsModule.js";
import newsLetterModel from "../../../models/contact/newsLetterModel.js"

export const saveContactDetails = async (data) => {
    const booking = new contactUsModel({ ...data });
    try {
      await booking.save();
      return res;
    } catch (error) {
      return error;
    }
  };
  
export const getContactDetails = async () => {
  try {
    const response = await contactUsModel.find().sort({ createdAt: -1 });
    return response;
  } catch (error) {
    return error;
  }
};

export const saveNewsLetter = async (data) => {
  const newsLetter = new newsLetterModel({ ...data });
  try {
    await newsLetter.save();
    return res;
  } catch (error) {
    return error;
  }
};


export const getNewsLetter = async () => {
  try {
    const response = await newsLetterModel.find().sort({ createdAt: -1 });
    return response;
  } catch (error) {
    return error;
  }
};