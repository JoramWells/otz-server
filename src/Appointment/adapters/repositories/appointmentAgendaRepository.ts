// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { IAppointmentAgendaRepository } from '../../application/interfaces/appointment/IAppointmentAgendaRepository'
import { appointmentAgendaCache } from '../../constants/appointmentCache'
import { AppointmentAgendaEntity } from '../../domain/entities/AppointmentAgendaEntity'
import { AppointmentAgenda, AppointmentAgendaAttributes } from '../../domain/models/appointment/appointmentAgenda.model'
// import { logger } from '../../utils/logger'
import { RedisAdapter } from './redisAdapter'
// import { createClient } from 'redis'

export class AppointmentAgendaRepository implements IAppointmentAgendaRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: AppointmentAgendaEntity
  ): Promise<AppointmentAgendaEntity> { 
    await this.redisClient.connect()
    const results: AppointmentAgendaAttributes = await AppointmentAgenda.create(data);
    await this.redisClient.del(appointmentAgendaCache)
    console.log('deleted cache!!')

    return results;
  }

  async find(): Promise<AppointmentAgendaEntity[]> {
    await this.redisClient.connect();
    // check if patient
    if ((await this.redisClient.get(appointmentAgendaCache)) === null) {
      const results = await AppointmentAgenda.findAll({});
      // logger.info({ message: "Fetched from db!" });
      // console.log("fetched from db!");
      // set to cace
      await this.redisClient.set(appointmentAgendaCache, JSON.stringify(results));

      return results;
    }
    const cachedPatients: string | null = await this.redisClient.get(
      appointmentAgendaCache
    );
    if (cachedPatients === null) {
      return [];
    }
    await this.redisClient.disconnect();
    // logger.info({ message: "Fetched from cache!" });
    console.log("fetched from cache!");

    const results: AppointmentAgendaEntity[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<AppointmentAgendaEntity | null> {
    await this.redisClient.connect();
    if ((await this.redisClient.get(id)) === null) {
      const results: AppointmentAgenda | null = await AppointmentAgenda.findOne({
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
    const results: AppointmentAgendaEntity = JSON.parse(cachedData);
    console.log("fetched from cace!");

    return results;
  }
}
