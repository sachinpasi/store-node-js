import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { CONSTANTS } from "../constants";
import { User } from "../models/user.model";
import { asyncWrapper } from "../utils/asyncWrapper";
import { ErrorResponse } from "../utils/errorResponse";

const verifyJWT = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ErrorResponse(401, "Unauthorized request");
    }

    try {
      const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET || ""
      );
      const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
      );
      if (!user) {
        throw new ErrorResponse(401, CONSTANTS.TOKEN_EXPIRED);
      }
      req.user = user;
      next();
    } catch (error) {
      throw new ErrorResponse(401, CONSTANTS.TOKEN_EXPIRED);
    }
  }
);
