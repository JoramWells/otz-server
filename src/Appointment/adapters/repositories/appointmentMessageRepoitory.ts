// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
import { Op, Sequelize } from 'sequelize';
import { IAppointmentMessageRepository } from '../../application/interfaces/appointment/IAppointmentMessageRepository';
import { RedisAdapter } from './redisAdapter';
import { AppointmentMessageAttributes } from 'otz-types';
import { AppointmentMessage } from '../../domain/models/appointment/appointmentMessage';
// import { mmasCache } from '../../../constants/appointmentCache';

// import { createClient } from 'redis'

export class AppointmentMessageRepository implements IAppointmentMessageRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(data: AppointmentMessageAttributes  ): Promise<AppointmentMessageAttributes> {


      const results = await AppointmentMessage.create(data)
      console.log('new mess!!')
      return results


  }

  async find(): Promise<AppointmentMessageAttributes[]> {
    // await this.redisClient.connect();
    
    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
      const results = await AppointmentMessage.findAll({});
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

    // const results: AppointmentMessageAttributes[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<AppointmentMessageAttributes[] | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {

          const results: AppointmentMessage[] | null = await AppointmentMessage.findAll({
            where: {
              appointmentID: id,
            },
          });
    
          return results;



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
    // const results: AppointmentMessageAttributes = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return null;
  }
}
