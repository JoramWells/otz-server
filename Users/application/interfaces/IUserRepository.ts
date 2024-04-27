import { type UserEntity } from '../../domain/entities/UserEntity'

export interface IUserRepository {
  create: (data: UserEntity) => Promise<UserEntity>
  find: () => Promise<UserEntity[]>
  findById: (id: string) => Promise<UserEntity | null>
}
