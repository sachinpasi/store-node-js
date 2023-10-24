import { body, param } from "express-validator";

const brandBodyValidator = () => {
  return [body("name").trim().notEmpty().withMessage("Brand name is required")];
};

export { brandBodyValidator };
