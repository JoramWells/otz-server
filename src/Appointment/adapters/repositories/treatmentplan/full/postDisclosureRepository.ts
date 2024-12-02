// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
// import { mmasCache } from '../../../constants/appointmentCache';

import { PostDisclosureAttributes } from "otz-types";
import { IPostDisclosureRepository } from "../../../../application/interfaces/disclosure/full/IPostDisclosureRepository";
import { PostDisclosure } from "../../../../domain/models/treatmentplan/disclosure/full/postDisclosureAssessment.model";
import { Patient } from "../../../../domain/models/patients.models";

// import { RedisAdapter } from '../redisAdapter'
// import { createClient } from 'redis'

export class PostDisclosureRepository implements IPostDisclosureRepository {
  // private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: PostDisclosureAttributes
  ): Promise<PostDisclosureAttributes> {
    return await PostDisclosure.create(data);
  }

  async find(): Promise<PostDisclosureAttributes[]> {
    // await this.redisClient.connect();

    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
    const results = await PostDisclosure.findAll({
      include: [
        {
          model: Patient,
          attributes: ["firstName", "middleName", "avatar"],
        },
      ],
    });
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

  async findById(
    id: string
  ): Promise<PostDisclosureAttributes | null | undefined> {
    try {
      // await this.redisClient.connect();
      // if ((await this.redisClient.get(id)) === null) {
      const results = await PostDisclosure.findOne({
        where: {
          id,
        },
      });

      return results;
    } catch (error) {
      console.log(error);
    }
  }

  //
  async findByVisitId(
    id: string
  ): Promise<PostDisclosureAttributes | null | undefined> {
    try {
      // await this.redisClient.connect();
      // if ((await this.redisClient.get(id)) === null) {
      const results = await PostDisclosure.findOne({
        order: [["createdAt", "DESC"]],
        where: {
          patientID: id,
        },
      });

      return results;
    } catch (error) {
      console.log(error);
    }
  }

  //
  async findByPatientId(
    id: string
  ): Promise<PostDisclosureAttributes | null | undefined> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    try {
      const results = await PostDisclosure.findOne({
        order: [["createdAt", "DESC"]],
        where: {
          patientID: id,
        },
      });

      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async findAllByVisitId(
    id: string
  ): Promise<PostDisclosureAttributes[] | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results: PostDisclosure[] | null = await PostDisclosure.findAll({
      where: {
        patientVisitID: id,
      },
    });

    return results;
  }
}
