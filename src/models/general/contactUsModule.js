import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message:{
    type:String,
    require:true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const contactUsModel = new mongoose.model("contactUs", contactUsSchema);

export default contactUsModel;
