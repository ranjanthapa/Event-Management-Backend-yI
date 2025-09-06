import { LoginDto } from "../dtos/login.dto";
import type { UserDto } from "../dtos/user.dto";
import type { User } from "../interfaces/user.interface";
import { ApiError } from "../utils/api-error";
import { generateJwtToken } from "../utils/jwt";
import { checkPassword, hashPassword } from "./password.service";
import { findByEmail, save } from "./user.service";

export const registerUser = async (userDto: UserDto) => {
    const isUserExists = await findByEmail(userDto.email);
    if(isUserExists){
        throw new ApiError("User already exists with the provided email", 409)
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


export const login = async (loginDto : LoginDto) => {
    const user = await findByEmail(loginDto.email);
    if(!user){
        throw new ApiError("User not found", 401);
    }
    const isPasswordMatched = await checkPassword(loginDto.password, user.password);
    if(!isPasswordMatched){
        throw new ApiError("Invalid Password", 401);
    }

    const {id, email, role}  = user;
    const jwtToken = generateJwtToken({id, email, role});
    return jwtToken;
}