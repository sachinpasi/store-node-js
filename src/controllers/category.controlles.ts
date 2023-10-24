import { Request, Response } from "express";

import { CONSTANTS } from "../constants";
import { Category } from "../models/category.model";
import { asyncWrapper } from "../utils/asyncWrapper";
import { ErrorResponse } from "../utils/errorResponse";
import { SuccessResponse } from "../utils/successResponse";
import { getMongoosePaginationOptions } from "../helper";

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

const getAllCategoreis = asyncWrapper(async (req: Request, res: Response) => {
  const { page = 1, limit = CONSTANTS.PAGINATION_LIMIT } = req.query;
  const categoryAggregate = Category.aggregate([{ $match: {} }]);

  const categories = await (<any>Category).aggregatePaginate(
    categoryAggregate,
    getMongoosePaginationOptions({
      page,
      limit,
      customLabels: {
        totalDocs: "totalCategories",
        docs: "categories",
      },
    })
  );

  return res
    .status(200)
    .json(new SuccessResponse(200, categories, CONSTANTS.FETCH_SUCCESS));
});

export { createCategory, getAllCategoreis };
