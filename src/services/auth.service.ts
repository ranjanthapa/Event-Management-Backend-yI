import type { UserDto } from "../dtos/user.dto";
import type { User } from "../interfaces/user.interface";
import { hashPassword } from "./password.service";
import { findByEmail, save } from "./user.service";

export const registerUser = async (userDto: UserDto) => {
    const isUserExists = await findByEmail(userDto.email);
    if(isUserExists){
        throw new Error("User already exists with the provided email")
    }

    const hashedPassword = await hashPassword(userDto.password);
    
    const newUser : User = {
        id: Date.now(),
        email: userDto.email,
        password: hashedPassword,
        role: userDto.role
    }
    await save(newUser);
}