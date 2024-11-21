// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'

// import { mmasCache } from '../../../constants/appointmentCache';

import { NotificationAttributes } from "otz-types";
import { INotificationRepository } from "../../../application/interfaces/notify/INotificationRepository";
import { Notification } from "../../../domain/models/notify/notification.model";
import { RedisAdapter } from "../redisAdapter";
import { User } from "../../../domain/models/user.model";
// import { createClient } from 'redis'

export class NotificationRepository implements INotificationRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(data: NotificationAttributes): Promise<NotificationAttributes> {
    const results = await Notification.create(data);

    return results;
  }

  async find(hospitalID: string): Promise<NotificationAttributes[]> {
    // await this.redisClient.connect();
    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
    const results = await Notification.findAll({
      where: {
        isRead: false,
      },
      include: [
        {
          model: User,
          where: {
            hospitalID,
          },
        },
      ],
    });
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

    // const results: NotificationAttributes[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<NotificationAttributes | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results: Notification | null = await Notification.findOne({
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
    // const results: NotificationAttributes = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }
}
