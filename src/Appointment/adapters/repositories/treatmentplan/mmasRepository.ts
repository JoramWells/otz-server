// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
import { IMMASRepository } from '../../../application/interfaces/treatmentplan/IMMASRepository';
import { mmasCache } from '../../../constants/appointmentCache';
import { MMASEntity } from '../../../domain/entities/treatmentplan/MMASEntity';
import { MMAS } from '../../../domain/models/treatmentplan/mmas.model';
import { RedisAdapter } from '../redisAdapter'
// import { createClient } from 'redis'

export class MMASRepository implements IMMASRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: MMASEntity
  ): Promise<MMASEntity> {
    const results  = await MMAS.create(data);

    return results;
  }

  async find(): Promise<MMASEntity[]> {
    await this.redisClient.connect();
    // check if patient
    if ((await this.redisClient.get(mmasCache)) === null) {
      const results = await MMAS.findAll({});
      // logger.info({ message: "Fetched from db!" });
      // console.log("fetched from db!");
      // set to cace
      await this.redisClient.set(mmasCache, JSON.stringify(results));

      return results;
    }
    const cachedPatients: string | null = await this.redisClient.get(
      mmasCache
    );
    if (cachedPatients === null) {
      return [];
    }
    await this.redisClient.disconnect();
    // logger.info({ message: "Fetched from cache!" });
    console.log("fetched from cache!");

    const results: MMASEntity[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<MMASEntity | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
      const results: MMAS | null = await MMAS.findOne({
        where: {
          patientVisitID:id,
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
    // const results: MMASEntity = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }
}
