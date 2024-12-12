// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
// import { mmasCache } from '../../../constants/appointmentCache';
import {
  ChildCaregiverReadinessAttributes,
  ChildDisclosureEligibilityAttributes,
} from "otz-types";
import { IDisclosureEligibilityRepository } from "../../../../application/interfaces/disclosure/partial/IDisclosureEligibilityRepository";
import { connect } from "../../../../db/connect";
import { ChildCaregiverReadiness } from "../../../../domain/models/treatmentplan/disclosure/childCaregiverReadiness.model";
import { ChildDisclosureEligibility } from "../../../../domain/models/treatmentplan/disclosure/childDisclosureEligibility.model";
import { PartialDisclosure } from "../../../../domain/models/treatmentplan/disclosure/partialDisclosure.model";
import { Patient } from "../../../../domain/models/patients.models";
import { completePartialDisclosure } from "../../../../utils/completePartialDisclosure";
// import { RedisAdapter } from '../redisAdapter'
// import { createClient } from 'redis'

export class DisclosureEligibilityRepository
  implements IDisclosureEligibilityRepository
{
  // private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: ChildDisclosureEligibilityAttributes
  ): Promise<ChildDisclosureEligibilityAttributes | undefined | null> {
    // return await connect.transaction(async (t) => {
    try {
      const results = await ChildDisclosureEligibility.create(data);
      if (results) {
        await completePartialDisclosure({
          childCaregiverReadiness: undefined,
          childDisclosureEligibility: results,
        });
      }

      return results;
    } catch (error) {
      console.log(error);
    }
    // });
  }

  async find(): Promise<ChildDisclosureEligibilityAttributes[]> {
    // await this.redisClient.connect();

    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
    const results = await ChildDisclosureEligibility.findAll({
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

    // const results: ChildDisclosureEligibilityAttributes[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(
    id: string
  ): Promise<ChildDisclosureEligibilityAttributes | null | undefined> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    try {
      const results: ChildDisclosureEligibility | null =
        await ChildDisclosureEligibility.findOne({
          where: {
            id,
          },
        });
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async findByPatientId(
    id: string
  ): Promise<ChildDisclosureEligibilityAttributes | null | undefined> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    try {
      const results = await ChildDisclosureEligibility.findOne({
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
  async findByVisitId(
    id: string
  ): Promise<ChildDisclosureEligibilityAttributes | null | undefined> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    try {
      const results = await ChildDisclosureEligibility.findOne({
        order: [["createdAt", "DESC"]],
        where: {
          patientVisitID: id,
        },
      });

      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async findAllByVisitId(
    id: string
  ): Promise<ChildDisclosureEligibilityAttributes[] | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results: ChildDisclosureEligibility[] | null =
      await ChildDisclosureEligibility.findAll({
        where: {
          patientVisitID: id,
        },
      });

    return results;
  }
}
