import "reflect-metadata";
import dotenv from "dotenv";
import http from "http";

dotenv.config();

import express from "express";
// Import necessary modules from @loaders/initalizer and @config
import { initializeApp } from "./loader/intilizer.js";
// import { PORT } from '@config';
import logger from "./logger/index.js";
import 'dotenv/config';

// import { swaggerServe, swaggerSetup } from  './config.js'

async function startApplication() {
  try {
    // Your other initialization logic here

    logger.info("Application started successfully");

    const app = express();
    const server = http.createServer(app);
    // app.use("/api-docs", swaggerServe, swaggerSetup);
    // ... your Express setup logic

    initializeApp(app, server);
    server.listen(process.env.PORT || 5000, () => {
      logger.info("Server is running");
    });
  } catch (error) {
    logger.error("Error in starting application", error);
    logger.error("Killing application process");
    process.exit(1);
  }
}

startApplication().catch((err) =>
  logger.error("Error occurred while starting application.", err)
);
