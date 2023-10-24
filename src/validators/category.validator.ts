import { body, param } from "express-validator";

const categoryBodyValidator = () => {
  return [
    body("name").trim().notEmpty().withMessage("Category name is required"),
  ];
};

export { categoryBodyValidator };
