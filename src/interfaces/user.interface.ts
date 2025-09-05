import type { Role } from "../enums/user.role.enum";

export interface User{
    id: number,
    email:string,
    password:string,
    role: Role
}

