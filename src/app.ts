import express from "express";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import { CONSTANTS } from "./constants";
import { getRouteURL } from "./helper";

import userRouter from "./routes/user.routes";
import categoryRouter from "./routes/category.routes";
import brandRouter from "./routes/brand.routes";

import { errorHandler } from "./middleware/error.middleware";

const app = express();
const httpServer = createServer(app);

app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());

app.use(getRouteURL(CONSTANTS.ROUTES.API_CATEGORIES.USER), userRouter);
app.use(getRouteURL(CONSTANTS.ROUTES.API_CATEGORIES.CATEGORY), categoryRouter);
app.use(getRouteURL(CONSTANTS.ROUTES.API_CATEGORIES.BRAND), brandRouter);

app.use(errorHandler);

export { httpServer };
