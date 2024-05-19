// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
import { IDisclosureChecklistRepository } from '../../../application/interfaces/treatmentplan/IDisclosureChecklistRepository';
// import { mmasCache } from '../../../constants/appointmentCache';
import { DisclosureChecklistEntity } from '../../../domain/entities/treatmentplan/DisclosureChecklistEntity';
import { DisclosureChecklist } from '../../../domain/models/treatmentplan/disclosureChecklist.model';
import { RedisAdapter } from '../redisAdapter'
// import { createClient } from 'redis'

export class DisclosureChecklistRepository implements IDisclosureChecklistRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: DisclosureChecklistEntity
  ): Promise<DisclosureChecklistEntity> {
    const results = await DisclosureChecklist.create(data);

    return results;
  }

  async find(): Promise<DisclosureChecklistEntity[]> {
    // await this.redisClient.connect();
    
    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
      const results = await DisclosureChecklist.findAll({});
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

    // const results: DisclosureChecklistEntity[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<DisclosureChecklistEntity | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
      const results: DisclosureChecklist | null = await DisclosureChecklist.findOne({
        where: {
          patientVisitID: id,
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
    // const results: DisclosureChecklistEntity = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }
}
