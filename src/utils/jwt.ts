import jwt from "jsonwebtoken";
import { JwtPayloadI } from "../interfaces/jwt.payload.interface";

const JWT_SECRET = process.env.JWT_SECRET || "YOUNGINOVATION";

export const generateJwtToken = (payload: JwtPayloadI): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};


export const verifyJwtToken = (token: string)  => {
  return jwt.verify(token, JWT_SECRET) as JwtPayloadI;
}