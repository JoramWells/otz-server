// import { IUserInteractor } from '../../application/interfaces/IUserInteractor'
// import { logger } from '../../utils/logger'

// import { mmasCache } from '../../../constants/appointmentCache';

import { IUserNotificationRepository } from '../../../application/interfaces/notify/IUserNotificationRepository';
import { UserNotificationEntity } from '../../../domain/entities/notify/UserNotificationEntity.model';
import { UserNotification } from '../../../domain/models/notify/userNotifications.model';
import { RedisAdapter } from '../redisAdapter'
// import { createClient } from 'redis'

export class UserNotificationRepository implements IUserNotificationRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: UserNotificationEntity
  ): Promise<UserNotificationEntity> {
    const results  = await UserNotification.create(data);

    return results;
  }

  async find(): Promise<UserNotificationEntity[]> {
    await this.redisClient.connect();
    // check if User
    // if ((await this.redisClient.get(mmasCache)) === null) {
      const results = await UserNotification.findAll({});
      // logger.info({ message: "Fetched from db!" });
      // console.log("fetched from db!");
      // set to cace
      // await this.redisClient.set(mmasCache, JSON.stringify(results));

    //   return results;
    // }
    // const cachedUsers: string | null = await this.redisClient.get(
    //   mmasCache
    // );
    // if (cachedUsers === null) {
    //   return [];
    // }
    // await this.redisClient.disconnect();
    // logger.info({ message: "Fetched from cache!" });
    // console.log("fetched from cache!");

    // const results: UserNotificationEntity[] = JSON.parse(cachedUsers);
    return results;
  }

  async findById(id: string): Promise<UserNotificationEntity | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
      const results: UserNotification | null = await UserNotification.findOne({
        where: {
          id,
        },
      });

      // const UserResults: AppointmentEntity = {
      //   firstName: results?.firstName,
      //   middleName: results?.middleName,
      //   sex: results?.sex,
      //   phoneNo: results?.phoneNo,
      //   idNo: results?.idNo,
      //   occupationID: results?.occupationID,
      // };
    //   await this.redisClient.set(id, JSON.stringify(results));

    //   return results;
    // }

    // const cachedData: string | null = await this.redisClient.get(id);
    // if (cachedData === null) {
    //   return null;
    // }
    // const results: UserNotificationEntity = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }
}
