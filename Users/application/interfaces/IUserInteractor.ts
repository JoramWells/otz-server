import { type User } from '../../domain/entities/UserEntity'

export interface IUserInteractor {
  createUser: (userData: any) => Promise<User>
  getAllUsers: () => Promise<User>
  getUserById: (id: string) => Promise<User>
}
