import type { NextFunction, Request, Response } from "express";
import { login, registerUser } from "../services/auth.service";
import type { UserDto } from "../dtos/user.dto";
import { LoginDto } from "../dtos/login.dto";

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


export const loginController = async(req: Request, res: Response, next: NextFunction)=>{
  try {
    const loginDto = req.body as LoginDto;
    const token =  await login(loginDto);
    res.status(200).json({
      status: "success",
      token
    });

  } catch (error) {
    next(error);
  }
}