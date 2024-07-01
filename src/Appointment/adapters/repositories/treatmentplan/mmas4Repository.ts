// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
import { MMASFourAttributes } from 'otz-types';
import { IMMASFourRepository } from '../../../application/interfaces/treatmentplan/IMMAS4Repository';
import { mmasCache } from '../../../constants/appointmentCache';
import { MMASFour } from '../../../domain/models/treatmentplan/mmas4.model';
import { RedisAdapter } from '../redisAdapter'
// import { createClient } from 'redis'

export class MMASFourRepository implements IMMASFourRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(data: MMASFourAttributes): Promise<MMASFourAttributes> {
    const results = await MMASFour.create(data);

    return results;
  }

  async find(): Promise<MMASFourAttributes[]> {
    // await this.redisClient.connect();
    // // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
    const results = await MMASFour.findAll({});
    // logger.info({ message: "Fetched from db!" });
    // console.log("fetched from db!");
    // set to cace
    // await this.redisClient.set(mmasCache, JSON.stringify(results));

    return results;
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

    // const results: MMASFourAttributes[] = JSON.parse(cachedPatients);
    // return results;
  }

  async findById(id: string): Promise<MMASFourAttributes | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results: MMASFour | null = await MMASFour.findOne({
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
    // const results: MMASFourAttributes = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }

  //
  async findByPatientId(id: string): Promise<MMASFourAttributes | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results: MMASFour | null = await MMASFour.findOne({
      order:[['createdAt', 'DESC']],
      where: {
         patientID:id,
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
    // const results: MMASFourAttributes = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }
}
