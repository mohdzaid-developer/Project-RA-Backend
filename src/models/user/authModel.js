import mongoose from "mongoose";

const userAuth = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    required: true,
  },
});

const userAuthModule = new mongoose.model("Authentication", userAuth);

export default userAuthModule;
