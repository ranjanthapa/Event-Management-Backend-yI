import { NextFunction, Request, Response } from "express";
import { verifyJwtToken } from "../utils/jwt";
import { ApiError } from "../utils/api-error";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Login required",
    });
  }
  try {
    const decoded = verifyJwtToken(token);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const restrictTo = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new ApiError("You are not authorized to perform this action.", 401)
    }
    next();
  };
};