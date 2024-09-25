import { UserAvailabilityAttributes } from "otz-types"

export interface IUserAvailabilityInteractor {
  createUserAvailability: (
    userData: any
  ) => Promise<UserAvailabilityAttributes>;
  getAllUserAvailabilities: () => Promise<UserAvailabilityAttributes[]>;
  getUserAvailabilityById: (
    id: string
  ) => Promise<UserAvailabilityAttributes | null>;
  editUserAvailability: (data: UserAvailabilityAttributes) => Promise<UserAvailabilityAttributes | null>;
}
