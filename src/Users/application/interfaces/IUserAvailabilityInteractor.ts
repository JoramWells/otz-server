import { type UserAvailabilityEntity } from '../../domain/entities/UserAvailailityEntity'

export interface IUserAvailabilityInteractor {
  createUserAvailability: (userData: any) => Promise<UserAvailabilityEntity>
  getAllUserAvailabilities: () => Promise<UserAvailabilityEntity[]>
  getUserAvailabilityById: (id: string) => Promise<UserAvailabilityEntity | null>
}
