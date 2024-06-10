// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { IAppointmentStatusRepository } from '../../application/interfaces/appointment/IAppointmentStatusRepository'
import {   appointmentStatusCache } from '../../constants/appointmentCache'
import { AppointmentStatusEntity } from '../../domain/entities/AppointmentStatusEntity'
import { AppointmentStatus, AppointmentStatusAttributes } from '../../domain/models/appointment/appointmentStatus.model'
// import { logger } from '../../utils/logger'
import { RedisAdapter } from './redisAdapter'
// import { createClient } from 'redis'

export class AppointmentStatusRepository implements IAppointmentStatusRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: AppointmentStatusEntity
  ): Promise<AppointmentStatusEntity> {
    await this.redisClient.connect()
    const results: AppointmentStatusAttributes = await AppointmentStatus.create(data);
    await this.redisClient.del(appointmentStatusCache);
    return results;
  }

  async find(): Promise<AppointmentStatusEntity[]> {
    await this.redisClient.connect();
    
    // check if patient
    if ((await this.redisClient.get(appointmentStatusCache)) === null) {
      const results = await AppointmentStatus.findAll({});
      // logger.info({ message: "Fetched from db!" });
      // console.log("fetched from db!");
      // set to cace
      await this.redisClient.set(appointmentStatusCache, JSON.stringify(results));

      return results;
    }
    const cachedPatients: string | null = await this.redisClient.get(
      appointmentStatusCache
    );
    if (cachedPatients === null) {
      return [];
    }
    await this.redisClient.disconnect();
    // logger.info({ message: "Fetched from cache!" });
    console.log("fetched from cache!");

    const results: AppointmentStatusEntity[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<AppointmentStatusEntity | null> {
    await this.redisClient.connect();
    if ((await this.redisClient.get(id)) === null) {
      const results: AppointmentStatus | null = await AppointmentStatus.findOne({
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
      await this.redisClient.set(id, JSON.stringify(results));

      return results;
    }

    const cachedData: string | null = await this.redisClient.get(id);
    if (cachedData === null) {
      return null;
    }
    const results: AppointmentStatusEntity = JSON.parse(cachedData);
    console.log("fetched from cace!");

    return results;
  }
}
