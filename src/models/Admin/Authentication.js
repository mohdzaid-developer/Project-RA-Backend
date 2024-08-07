import mongoose from "mongoose";

const adminAuth = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  generatedPassword: {
    type: String,
    required: true,
  },
  isValid:{
    type:Boolean,
    required:true
  }
});

const adminAuthModule = new mongoose.model("AdminAuthentication", adminAuth);

export default adminAuthModule;
