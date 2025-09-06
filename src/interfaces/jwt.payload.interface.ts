import { Role } from "../enums/user.role.enum";
import { JwtPayload } from "jsonwebtoken";

export interface JwtPayloadI{
    id: number,
    email: string,
    role: Role
}