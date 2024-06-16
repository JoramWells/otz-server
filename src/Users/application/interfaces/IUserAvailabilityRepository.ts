import { type UserAvailabilityEntity } from '../../domain/entities/UserAvailailityEntity'

export interface IUserAvailabilityRepository {
  create: (data: UserAvailabilityEntity) => Promise<UserAvailabilityEntity>
  find: () => Promise<UserAvailabilityEntity[]>
  findById: (id: string) => Promise<UserAvailabilityEntity | null>
}
