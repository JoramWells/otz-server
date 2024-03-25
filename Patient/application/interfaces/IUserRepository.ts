import { User } from '../../domain/entities/User'

export interface IPatientRepository {
  create(data: User): Promise<User>;
  find():Promise<User>;
  findById(id:string):Promise<User>
}