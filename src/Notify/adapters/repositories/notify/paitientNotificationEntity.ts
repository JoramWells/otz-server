// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
import { IPatientNotificationRepository } from '../../../application/interfaces/notify/IPatientNotificationRepository';
import { IMMASRepository } from '../../../application/interfaces/treatmentplan/IMMASRepository';
// import { mmasCache } from '../../../constants/appointmentCache';
import { PatientNotificationEntity } from '../../../domain/entities/notify/PatientNotificationEntity';
import { PatientNotification } from '../../../domain/models/notify/patientNotifications.model';
import { Patient } from '../../../domain/models/patients.models';
import { RedisAdapter } from '../redisAdapter'
// import { createClient } from 'redis'

export class PatientNotificationRepository implements IPatientNotificationRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: PatientNotificationEntity
  ): Promise<PatientNotificationEntity> {
    const results  = await PatientNotification.create(data);

    return results;
  }

  async find(): Promise<PatientNotificationEntity[]> {
    await this.redisClient.connect();
    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
      const results = await PatientNotification.findAll({
        include:[
          {
            model: Patient,
            attributes:['id','firstName', 'middleName']
          }
        ]
      });
      // logger.info({ message: "Fetched from db!" });
      // console.log("fetched from db!");
      // set to cace
      // await this.redisClient.set(mmasCache, JSON.stringify(results));

    //   return results;
    // }
    // const cachedPatients: string | null = await this.redisClient.get(
    //   mmasCache
    // );
    // if (cachedPatients === null) {
    //   return [];
    // }
    // await this.redisClient.disconnect();
    // logger.info({ message: "Fetched from cache!" });
    // console.log("fetched from cache!");

    // const results: PatientNotificationEntity[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<PatientNotificationEntity | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
      const results: PatientNotification | null = await PatientNotification.findOne({
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
    // const results: PatientNotificationEntity = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }
}
