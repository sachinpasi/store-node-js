import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ErrorResponse } from "../utils/errorResponse";
import { CONSTANTS } from "../constants";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: ErrorResponse | any = err;

  if (!(error instanceof ErrorResponse)) {
    const statusCode =
      error.statusCode || (error instanceof mongoose.Error ? 400 : 500);
    const message = error.message || "Something went wrong";
    error = new ErrorResponse(
      statusCode,
      message,
      error.errors || [],
      err.stack
    );
  }

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === CONSTANTS.DEVLOPMENT
      ? { stack: error.stack }
      : {}),
  };

  console.error(response);

  return res.status(error.statusCode).json(response);
};

export { errorHandler };
