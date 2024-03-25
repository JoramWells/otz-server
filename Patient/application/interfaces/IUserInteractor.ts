import { User } from "../../domain/entities/User";

export interface IUserInteractor{
    createUser(userData: any):Promise<User>;
    getAllUsers():Promise<User>;
    getUserById(id: string):Promise<User>
}