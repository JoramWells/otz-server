// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
// import { mmasCache } from '../../../constants/appointmentCache';

import { IPostDisclosureRepository } from "../../../../application/interfaces/disclosure/full/IPostDisclosureRepository";
import { ExecuteDisclosureEntity } from "../../../../domain/entities/treatmentplan/disclosure/full/ExecuteDisclosureEntity";
import { PostDisclosureEntity } from "../../../../domain/entities/treatmentplan/disclosure/full/PostDisclosureEntity";
import { PostDisclosure } from "../../../../domain/models/treatmentplan/disclosure/full/postDisclosureAssessment.model";

// import { RedisAdapter } from '../redisAdapter'
// import { createClient } from 'redis'

export class DisclosureEligibilityRepository implements IPostDisclosureRepository {
  // private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: PostDisclosureEntity, readiness: ExecuteDisclosureEntity
  ): Promise<PostDisclosureEntity> {

       return await PostDisclosure.create(data);


  }

  async find(): Promise<PostDisclosureEntity[]> {
    // await this.redisClient.connect();

    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
    const results = await PostDisclosure.findAll({});
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

    // const results: PostDisclosureEntity[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<PostDisclosureEntity | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results: PostDisclosure | null =
      await PostDisclosure.findOne({
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
    // const results: PostDisclosureEntity = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }

  async findAllByVisitId(id: string): Promise<PostDisclosureEntity[] | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results: PostDisclosure[] | null =
      await PostDisclosure.findAll({
        where: {
          patientVisitID: id,
        },
      });

 

    return results;
  }
}
