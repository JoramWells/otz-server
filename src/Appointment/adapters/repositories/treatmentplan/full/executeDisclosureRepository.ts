// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'

import { IExecuteDisclosureRepository } from "../../../../application/interfaces/disclosure/full/IExecuteDisclosureRepository";
import { ExecuteDisclosureEntity } from "../../../../domain/entities/treatmentplan/disclosure/full/ExecuteDisclosureEntity";
import { ExecuteDisclosure } from "../../../../domain/models/treatmentplan/disclosure/full/executeDisclosure.model";

// import { mmasCache } from '../../../constants/appointmentCache';
// import { RedisAdapter } from '../redisAdapter'
// import { createClient } from 'redis'

export class ExecuteDisclosureRepository implements IExecuteDisclosureRepository {
  // private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: ExecuteDisclosureEntity
  ): Promise<ExecuteDisclosureEntity> {
    const results = await ExecuteDisclosure.create(data);

    return results;
  }

  async find(): Promise<ExecuteDisclosureEntity[]> {
    // await this.redisClient.connect();

    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
    const results = await ExecuteDisclosure.findAll({});
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

    // const results: ExecuteDisclosureEntity[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<ExecuteDisclosureEntity | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results: ExecuteDisclosure | null =
      await ExecuteDisclosure.findOne({
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
    // const results: ExecuteDisclosureEntity = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }

  async findAllByVisitId(
    id: string
  ): Promise<ExecuteDisclosureEntity[] | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results: ExecuteDisclosure[] | null =
      await ExecuteDisclosure.findAll({
        where: {
          patientVisitID: id,
        },
      });

    return results;
  }
}
