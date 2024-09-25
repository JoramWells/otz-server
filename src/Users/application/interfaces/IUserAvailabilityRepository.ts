import { UserAvailabilityAttributes } from "otz-types"

export interface IUserAvailabilityRepository {
  create: (
    data: UserAvailabilityAttributes
  ) => Promise<UserAvailabilityAttributes>;
  find: () => Promise<UserAvailabilityAttributes[]>;
  findById: (id: string) => Promise<UserAvailabilityAttributes | null>;
  edit: (data: UserAvailabilityAttributes) => Promise<UserAvailabilityAttributes | null>;
}
