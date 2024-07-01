// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'

// import { mmasCache } from '../../../constants/appointmentCache';
import { NotificationCategoryAttributes } from 'otz-types';
import { INotificationCategoryRepository } from '../../../application/interfaces/notify/INotificationCategoryRepository';
import { NotificationCategory } from '../../../domain/models/notify/notificationCategory.model';
import { RedisAdapter } from '../redisAdapter'
// import { createClient } from 'redis'

export class NotificationCategoryRepository implements INotificationCategoryRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: NotificationCategoryAttributes
  ): Promise<NotificationCategoryAttributes> {
    const results = await NotificationCategory.create(data);

    return results;
  }

  async find(): Promise<NotificationCategoryAttributes[]> {
    // await this.redisClient.connect();
    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
      const results = await NotificationCategory.findAll({});
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

    // const results: NotificationCategoryAttributes[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<NotificationCategoryAttributes | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
      const results: NotificationCategory | null = await NotificationCategory.findOne({
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
    // const results: NotificationCategoryAttributes = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }
}
