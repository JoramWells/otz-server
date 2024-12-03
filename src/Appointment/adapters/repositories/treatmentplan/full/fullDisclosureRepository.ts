// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
// import { mmasCache } from '../../../constants/appointmentCache';

import { FullDisclosureAttributes } from "otz-types";
import { IFullDisclosureRepository } from "../../../../application/interfaces/disclosure/full/IFullDisclosureRepository";
import { FullDisclosure } from "../../../../domain/models/treatmentplan/disclosure/full/fullDisclosure.model";

// import { RedisAdapter } from '../redisAdapter'

export class FullDisclosureRepository implements IFullDisclosureRepository {
  // private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: FullDisclosureAttributes
  ): Promise<FullDisclosureAttributes> {
    const results = await FullDisclosure.create(data);

    return results;
  }

  async find(): Promise<FullDisclosureAttributes[]> {
    // await this.redisClient.connect();

    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
    const results = await FullDisclosure.findAll({});
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

    // const results: FullDisclosureAttributes[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<FullDisclosureAttributes | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results: FullDisclosure | null = await FullDisclosure.findOne({
      order: [["createdAt", "DESC"]],
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
    // const results: FullDisclosureAttributes = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }

  async findAllByVisitId(
    id: string
  ): Promise<FullDisclosureAttributes[] | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results: FullDisclosure[] | null = await FullDisclosure.findAll({
      where: {
        id,
      },
    });

    return results;
  }

  async findByPatientId(
    id: string
  ): Promise<FullDisclosureAttributes | null | undefined> {
    try {
      // await this.redisClient.connect();
      // if ((await this.redisClient.get(id)) === null) {
      const results = await FullDisclosure.findOne({
        where: {
          patientID: id,
        },
      });

      return results;
    } catch (error) {
      console.log(error);
    }
  }
}
