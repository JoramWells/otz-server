import { type User } from '../../domain/entities/UserEntity'

export interface IPatientRepository {
  create: (data: User) => Promise<User>
  find: () => Promise<User>
  findById: (id: string) => Promise<User>
}
