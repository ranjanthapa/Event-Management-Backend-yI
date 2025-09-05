import {z} from "zod";
import { Role } from "../enums/user.role.enum";


export const UserSchema = z.object({
    email: z.string().email(),
    password:z.string().min(5),
    role: z.nativeEnum(Role)
})

export type UserDto = z.infer<typeof UserSchema>