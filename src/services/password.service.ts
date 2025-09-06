import bcrypt from "bcrypt";

export const hashPassword = async (plainPassword: string): Promise<string> =>{
    return await bcrypt.hash(plainPassword, 10);
}


export const checkPassword = async (plainPassword: string, hashPassword: string) : Promise<boolean>=>{
    return await bcrypt.compare(plainPassword, hashPassword);
}