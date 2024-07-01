// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'

// import { mmasCache } from '../../../constants/appointmentCache';

import { NotificationTypeAttributes } from 'otz-types';
import { INotificationTypeRepository } from '../../../application/interfaces/notify/INotificationTypeRepository';
import { NotificationType } from '../../../domain/models/notify/notificationType.model';
import { RedisAdapter } from '../redisAdapter'
// import { createClient } from 'redis'

export class NotificationTypeRepository implements INotificationTypeRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: NotificationTypeAttributes
  ): Promise<NotificationTypeAttributes> {
    const results = await NotificationType.create(data);

    return results;
  }

  async find(): Promise<NotificationTypeAttributes[]> {
    // await this.redisClient.connect();
    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
      const results = await NotificationType.findAll({});
      // logger.info({ message: "Fetched from db!" });
      // console.log("fetched from db!");
      // set to cace
    //   await this.redisClient.set(mmasCache, JSON.stringify(results));

    //   return results;
    // }
    // const cachedPatients: string | null = await this.redisClient.get(
    //   mmasCache
    // );
    // if (cachedPatients === null) {
    //   return [];
    // }
    // await this.redisClient.disconnect();
    // // logger.info({ message: "Fetched from cache!" });
    // console.log("fetched from cache!");

    // const results: NotificationTypeAttributes[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<NotificationTypeAttributes | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
      const results: NotificationType | null = await NotificationType.findOne({
        where: {
           id,
        },
      });

      // const patientResults: AppointmentEntity = {
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
    // const results: NotificationTypeAttributes = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }
}
