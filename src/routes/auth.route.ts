import { Router } from "express";
import { signupController } from "../controllers/auth.controller";
import { validateBody } from "../middlewares/validate-body.middleware";
import { UserSchema } from "../dtos/user.dto";

const authRouter = Router();

authRouter.post("/signup", validateBody(UserSchema), signupController);

export default authRouter;
