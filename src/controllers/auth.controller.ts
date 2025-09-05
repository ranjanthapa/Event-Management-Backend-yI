import type { NextFunction, Request, Response } from "express";
import { registerUser } from "../services/auth.service";
import type { UserDto } from "../dtos/user.dto";

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDto = req.body as UserDto;
    await registerUser(userDto);
    res.status(201).json({
      status: "success",
      message: "user registered successfully",
    });
  } catch (error) {
    next(error);
  }
};
