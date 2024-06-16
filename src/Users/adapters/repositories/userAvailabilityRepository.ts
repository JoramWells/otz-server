/* eslint-disable @typescript-eslint/no-var-requires */

import { type IUserAvailabilityRepository } from '../../application/interfaces/IUserAvailabilityRepository'
import { type UserAvailabilityEntity } from '../../domain/entities/UserAvailailityEntity'
import { UserAvailability } from '../../domain/models/userAvailability.model'

export class UserAvailabilityRepository implements IUserAvailabilityRepository {
  async create (data: UserAvailabilityEntity): Promise<UserAvailabilityEntity> {
    const results = await UserAvailability.create(data)

    return results
  }

  async find (): Promise<UserAvailabilityEntity[]> {
    const results = await UserAvailability.findAll({})
    return results
  }

  async findById (id: string): Promise<UserAvailabilityEntity | null> {
    const results = await UserAvailability.findOne({
      where: {
        userID: id
      }
    }
    )

    return results
  }
}
