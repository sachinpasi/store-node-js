import { Request, Response } from "express";

import { CONSTANTS } from "../constants";
import { asyncWrapper } from "../utils/asyncWrapper";
import { ErrorResponse } from "../utils/errorResponse";
import { SuccessResponse } from "../utils/successResponse";
import { Brand } from "../models/brand.models";

const createBrand = asyncWrapper(async (req: Request, res: Response) => {
  const { name, description } = req.body;

  const isBrandAlreadyExist = await Brand.findOne({
    $or: [{ name }],
  });

  if (isBrandAlreadyExist) {
    throw new ErrorResponse(409, CONSTANTS.BRAND_ALREADY_EXIST, []);
  }

  const brand = await Brand.create({ name, description });

  return res
    .status(201)
    .json(new SuccessResponse(200, brand, "Brand created successfully"));
});

const getAllBrands = asyncWrapper(async (req: Request, res: Response) => {
  const brands = await Brand.find();

  return res
    .status(200)
    .json(new SuccessResponse(200, brands, CONSTANTS.FETCH_SUCCESS));
});

export { createBrand, getAllBrands };
