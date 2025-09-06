import type { User } from "../interfaces/user.interface";
import fs from "fs/promises";
import { join } from "path";


const userFilePath = join(__dirname, "../data/users.data.json");

export const allUsers = async (): Promise<User[]> => {
  const data = await fs.readFile(userFilePath, "utf-8"); 
  return JSON.parse(data);
};

export const findByEmail = async (email: string): Promise<User | undefined> => {
    const data : User[] = await allUsers();
    const existingUser = data.find((user)=> user.email === email)
    return existingUser;
}

export const save = async (user: User) => {
    const users = await allUsers();
    users.push(user);
    const data = JSON.stringify(users, null, 2);
    await fs.writeFile(userFilePath, data);  
}





