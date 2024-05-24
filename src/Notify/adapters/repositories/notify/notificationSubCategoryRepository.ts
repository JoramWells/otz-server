// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'

// import { mmasCache } from '../../../constants/appointmentCache';
import { INotificationSubCategoryRepository } from '../../../application/interfaces/notify/INotificationSubCategoryRepository';
import { NotificationSubCategoryEntity } from '../../../domain/entities/notify/NotificationSubCategoryEntity';
import { NotificationSubCategory } from '../../../domain/models/notify/notificationSubCategory.model';
import { RedisAdapter } from '../redisAdapter'
// import { createClient } from 'redis'

export class NotificationSubCategoryRepository implements INotificationSubCategoryRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: NotificationSubCategoryEntity
  ): Promise<NotificationSubCategoryEntity> {
    const results = await NotificationSubCategory.create(data);

    return results;
  }

  async find(): Promise<NotificationSubCategoryEntity[]> {
    // await this.redisClient.connect();
    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
      const results = await NotificationSubCategory.findAll({});
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

    // const results: NotificationSubCategoryEntity[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<NotificationSubCategoryEntity | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
      const results: NotificationSubCategory | null = await NotificationSubCategory.findOne({
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
    // const results: NotificationSubCategoryEntity = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }
}
