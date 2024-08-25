import contactUsModel from "../../../models/contact/contactUsModule.js";
import newsLetterModel from "../../../models/contact/newsLetterModel.js";

export const saveContactDetails = async (data) => {
  const booking = new contactUsModel({ ...data });
  try {
    await booking.save();
    return res;
  } catch (error) {
    return error;
  }
};

export const getContactDetails = async (filter) => {
  try {
    const totalResultsCount = await contactUsModel.countDocuments();
    let pagination = {
      pageNum: filter?.pageNum,
      pageSize: filter?.pageSize,
    };

    delete filter.pageNum;
    delete filter.pageSize;

    const response = await contactUsModel
      .find()
      .sort({ createdAt: -1 })
      .skip((pagination?.pageNum - 1) * pagination?.pageSize)
      .limit(pagination?.pageSize);
      return { data: response, totalResultsCount };
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

export const getNewsLetter = async (filter) => {
  try {
    const totalResultsCount = await newsLetterModel.countDocuments();
    let pagination = {
      pageNum: filter?.pageNum,
      pageSize: filter?.pageSize,
    };

    delete filter.pageNum;
    delete filter.pageSize;
    const response = await newsLetterModel
      .find()
      .sort({
        createdAt: -1,
      })
      .skip((pagination?.pageNum - 1) * pagination?.pageSize)
      .limit(pagination?.pageSize);
    return { data: response, totalResultsCount };
  } catch (error) {
    return error;
  }
};
