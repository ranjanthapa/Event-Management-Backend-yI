import { Router } from "express";
import { loginController, signupController } from "../controllers/auth.controller";
import { validateBody } from "../middlewares/validate-body.middleware";
import { UserSchema } from "../dtos/user.dto";
import { LoginSchema } from "../dtos/login.dto";

const authRouter = Router();

authRouter.post("/signup", validateBody(UserSchema), signupController);
authRouter.post("/login", validateBody(LoginSchema), loginController);

export default authRouter;
