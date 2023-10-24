import { Router } from "express";
import { CONSTANTS } from "../constants";
import { verifyJWT, verifyPermission } from "../middleware/user.middleware";
import { validate } from "../validators";
import { brandBodyValidator } from "../validators/brand.validator";
import { createBrand, getAllBrands } from "../controllers/brand.controllers";

const router = Router();

router
  .route(CONSTANTS.ROUTES.BRAND_ROUTES.CREATE)
  .post(
    verifyJWT,
    verifyPermission([CONSTANTS.AVAILABLE_USER_ROLES.ADMIN]),
    brandBodyValidator(),
    validate,
    createBrand
  );

router.route(CONSTANTS.ROUTES.BRAND_ROUTES.GET_ALL_BRANDS).get(getAllBrands);

export default router;
