import { type UserEntity } from '../../domain/entities/UserEntity'

export interface IUserInteractor {
  createUser: (userData: any) => Promise<UserEntity>
  getAllUsers: () => Promise<UserEntity[]>
  getUserById: (id: string) => Promise<UserEntity | null>
}
