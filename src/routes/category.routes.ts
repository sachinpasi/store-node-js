import { Router } from "express";
import { CONSTANTS } from "../constants";
import { verifyJWT, verifyPermission } from "../middleware/user.middleware";
import { validate } from "../validators";
import { categoryBodyValidator } from "../validators/category.validator";
import { createCategory } from "../controllers/category.controlles";

const router = Router();

router
  .route(CONSTANTS.ROUTES.CATEGORY_ROUTES.CREATE)
  .post(
    verifyJWT,
    verifyPermission([CONSTANTS.AVAILABLE_USER_ROLES.ADMIN]),
    categoryBodyValidator(),
    validate,
    createCategory
  );

export default router;
