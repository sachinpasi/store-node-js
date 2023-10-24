import { Request, Response } from "express";

import { CONSTANTS } from "../constants";
import { Category } from "../models/category.model";
import { asyncWrapper } from "../utils/asyncWrapper";
import { ErrorResponse } from "../utils/errorResponse";
import { SuccessResponse } from "../utils/successResponse";

const createCategory = asyncWrapper(async (req: Request, res: Response) => {
  const { name } = req.body;

  const isAlreadyExist = await Category.findOne({
    $or: [{ name }],
  });

  if (isAlreadyExist) {
    throw new ErrorResponse(409, CONSTANTS.CATEGORY_ALREADY_EXIST, []);
  }

  const category = await Category.create({
    name,
  });

  return res
    .status(201)
    .json(new SuccessResponse(200, category, "Category created successfully"));
});

export { createCategory };
