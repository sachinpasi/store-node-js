import mongoose from "mongoose";
import { Request, Response } from "express";
import { CONSTANTS } from "../constants";
import { User } from "../models/user.model";
import { asyncWrapper } from "../utils/asyncWrapper";
import { ErrorResponse } from "../utils/errorResponse";
import { SuccessResponse } from "../utils/successResponse";

const generateAccessAndRefreshTokens = async (
  userId: mongoose.Types.ObjectId
) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user?.generateAccessToken();
    const refreshToken = user?.generateRefreshToken();

    if (user) {
      user.refreshToken = refreshToken;
    }

    await user?.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ErrorResponse(500, CONSTANTS.ACCESS_TOKEN_GENERATION_FAILED);
  }
};

const registerUser = asyncWrapper(async (req: Request, res: Response) => {
  const { email, username, password, role } = req.body;

  const isUserExist = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) {
    throw new ErrorResponse(409, CONSTANTS.USER_ALREADY_EXIST, []);
  }
  const user = await User.create({
    email,
    password,
    username,
    isEmailVerified: false,
    role: role || CONSTANTS.AVAILABLE_USER_ROLES.USER,
  });

  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
  );

  if (!createdUser) {
    throw new ErrorResponse(500, CONSTANTS.USER_CREATION_FAILED);
  }

  return res
    .status(200)
    .json(
      new SuccessResponse(
        200,
        { user: createdUser },
        CONSTANTS.USER_CREATION_SUCCESS
      )
    );
});

const loginUser = asyncWrapper(async (req: Request, res: Response) => {
  const { email, username, password } = req.body;
  const user = await User.findOne({ $or: [{ username }, { email }] });

  if (!user) {
    throw new ErrorResponse(404, CONSTANTS.USER_NOT_FOUND);
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ErrorResponse(401, CONSTANTS.INVALID_CREDENTIALS);
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === CONSTANTS.PRODUCTION,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new SuccessResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        CONSTANTS.LOGIN_SUCCESS
      )
    );
});

export { registerUser, loginUser };
