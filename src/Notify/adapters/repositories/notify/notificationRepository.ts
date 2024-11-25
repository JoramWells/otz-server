// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'

// import { mmasCache } from '../../../constants/appointmentCache';

import { NotificationAttributes } from "otz-types";
import { INotificationRepository } from "../../../application/interfaces/notify/INotificationRepository";
import { Notification } from "../../../domain/models/notify/notification.model";
import { RedisAdapter } from "../redisAdapter";
import { User } from "../../../domain/models/user.model";
import moment from "moment";
import { NotificationResponseInterface } from "../../../entitties/notify/NotificationResponseInterface";
import { Op } from "sequelize";

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

  async find(
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ): Promise<NotificationResponseInterface | null> {
    // await this.redisClient.connect();
    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
    const currentDate = moment().format("YYYY-MM-DD");

    const where = searchQuery
      ? {
          [Op.or]: [
            { firstName: { [Op.iLike]: `%${searchQuery}%` } },
            { middleName: { [Op.iLike]: `%${searchQuery}%` } },
            { email: { [Op.iLike]: `%${searchQuery}%` } },
          ],
          hospitalID,
        }
      : {
          hospitalID,
        };

    //
    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const { rows, count } = await Notification.findAndCountAll({
      order: [["createdAt", "DESC"]],
      limit,
      offset,
      where: {
        isRead: false,
        currentDate,
      },
      include: [
        {
          model: User,
          where,
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
    return {
      data: rows,
      total: count,
      page: page,
      pageSize: limit,
    };
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
