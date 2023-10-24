import dotenv from "dotenv";

import connectDB from "./db/index";
import { httpServer } from "./app";
import { CONSTANTS } from "./constants";

dotenv.config();

try {
  connectDB().then(() => {
    httpServer.listen(process.env.PORT || CONSTANTS.SERVER_PORT, () => {
      console.log(
        "⚙️ Server is running on port: " +
          (process.env.PORT || CONSTANTS.SERVER_PORT)
      );
    });
  });
} catch (error) {
  console.log("Mongo db connect error: ", error);
}
