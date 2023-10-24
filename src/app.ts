import express from "express";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import { CONSTANTS } from "./constants";
import { getRouteURL } from "./helper";

import userRouter from "./routes/user.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();
const httpServer = createServer(app);

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());

app.use(getRouteURL(CONSTANTS.ROUTES.API_CATEGORIES.USER), userRouter);

app.use(errorHandler);

export { httpServer };
