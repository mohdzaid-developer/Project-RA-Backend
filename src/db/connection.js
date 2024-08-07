import mongoose from "mongoose";
import logger from "../logger/index.js";

export const mongoConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info("Connection is established");
    } catch (err) {
        logger.error(`Error is: ${err}`);
    }
};

