import { Request, Response, NextFunction } from "express";
import { validationResult, Result } from "express-validator";
import { ErrorResponse } from "../utils/errorResponse";

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors: Result<any> = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: any = [];

  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  // 422: Unprocessable Entity
  throw new ErrorResponse(
    422,
    "The data provided in the request is not valid. ",
    extractedErrors
  );
};

export { validate };
