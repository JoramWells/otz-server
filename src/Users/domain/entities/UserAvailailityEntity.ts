import { type WeekDays, type UserAvailabilityAttributes } from '../models/userAvailability.model'

export class UserAvailabilityEntity implements UserAvailabilityAttributes {
  constructor (
    public userID: string,
    public startTime: Date,
    public endTime: Date,
    public daysAvailable: WeekDays,
    public updateAt?: Date,
    public createdAt?: Date,
    public id?: string
  ) {}
}
