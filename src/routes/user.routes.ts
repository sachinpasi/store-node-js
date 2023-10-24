import { Router } from "express";

import { CONSTANTS } from "../constants";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validators/user.validators";
import { validate } from "../validators";
import { registerUser, loginUser } from "../controllers/user.controllers";

const router = Router();

router
  .route(CONSTANTS.ROUTES.USER_ROUTES.REGISTER)
  .post(userRegisterValidator(), validate, registerUser);

router
  .route(CONSTANTS.ROUTES.USER_ROUTES.LOGIN)
  .post(userLoginValidator(), validate, loginUser);

export default router;
