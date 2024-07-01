// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
// import { mmasCache } from '../../../constants/appointmentCache';

import { ExecuteDisclosureAttributes, PostDisclosureAttributes } from "otz-types";
import { IPostDisclosureRepository } from "../../../../application/interfaces/disclosure/full/IPostDisclosureRepository";
import { PostDisclosure } from "../../../../domain/models/treatmentplan/disclosure/full/postDisclosureAssessment.model";

// import { RedisAdapter } from '../redisAdapter'
// import { createClient } from 'redis'

export class DisclosureEligibilityRepository implements IPostDisclosureRepository {
  // private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: PostDisclosureAttributes, readiness: ExecuteDisclosureAttributes
  ): Promise<PostDisclosureAttributes> {

       return await PostDisclosure.create(data);


  }

  async find(): Promise<PostDisclosureAttributes[]> {
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

    // const results: PostDisclosureAttributes[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<PostDisclosureAttributes | null> {
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
    // const results: PostDisclosureAttributes = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }

  async findAllByVisitId(id: string): Promise<PostDisclosureAttributes[] | null> {
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
