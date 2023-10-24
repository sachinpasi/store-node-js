import mongoose from "mongoose";

import { CONSTANTS } from "../constants/index";

let dbInstance: any = undefined;

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.MONGODB_URI + "/" + CONSTANTS.DB_NAME
    );
    dbInstance = connectionInstance;
    console.log(
      `\n☘️ MongoDB Connected! Db host: ${connectionInstance.connection.host} | ${connectionInstance.connection.name} \n`
    );
  } catch (error) {
    console.log("MongoDB connection error: ", error);
    process.exit(1);
  }
};

export default connectDB;
