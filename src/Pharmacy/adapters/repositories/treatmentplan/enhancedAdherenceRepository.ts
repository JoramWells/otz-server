
import { IEnhancedAdherenceRepository } from '../../../application/interfaces/treatmentplan/IEnhancedAdherenceRepository';
import { EnhancedAdherenceAttributes } from 'otz-types';
import { EnhancedAdherence } from '../../../domain/models/treatmentplan/enhancedAdherence.model';
import { RedisAdapter } from '../redisAdapter';
// import { createClient } from 'redis'

export class EnhancedAdherenceRepository implements IEnhancedAdherenceRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: EnhancedAdherenceAttributes
  ): Promise<EnhancedAdherenceAttributes> {
    const results = await EnhancedAdherence.create(data);

    return results;
  }

  async find(): Promise<EnhancedAdherenceAttributes[]> {
    // await this.redisClient.connect();
    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
      const results = await EnhancedAdherence.findAll({});
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

    // const results: EnhancedAdherenceAttributes[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<EnhancedAdherenceAttributes | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
      const results: EnhancedAdherence | null = await EnhancedAdherence.findOne({
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
    // const results: EnhancedAdherenceAttributes = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }
}
