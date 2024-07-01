/* eslint-disable @typescript-eslint/no-var-requires */

import { UserAvailabilityAttributes } from 'otz-types'
import { type IUserAvailabilityRepository } from '../../application/interfaces/IUserAvailabilityRepository'
import { UserAvailability } from '../../domain/models/userAvailability.model'

export class UserAvailabilityRepository implements IUserAvailabilityRepository {
  async create (data: UserAvailabilityAttributes): Promise<UserAvailabilityAttributes> {
    const results = await UserAvailability.create(data)

    return results
  }

  async find (): Promise<UserAvailabilityAttributes[]> {
    const results = await UserAvailability.findAll({})
    return results
  }

  async findById (id: string): Promise<UserAvailabilityAttributes | null> {
    const results = await UserAvailability.findOne({
      where: {
        userID: id
      }
    }
    )

    return results
  }
}
