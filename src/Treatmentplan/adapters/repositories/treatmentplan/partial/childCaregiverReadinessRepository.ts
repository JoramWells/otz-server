// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
import { ChildCaregiverReadinessAttributes } from "otz-types";
import { IChildCaregiverRepository } from "../../../../application/interfaces/disclosure/partial/IChildCaregiverRepository";
import { ChildCaregiverReadiness } from "../../../../domain/models/treatmentplan/disclosure/childCaregiverReadiness.model";
import { Patient } from "../../../../domain/models/patients.models";
import { completePartialDisclosure } from "../../../../utils/completePartialDisclosure";
// import { mmasCache } from '../../../constants/appointmentCache';
// import { RedisAdapter } from '../redisAdapter'
// import { createClient } from 'redis'

export class ChildCaregiverReadinessRepository
  implements IChildCaregiverRepository
{
  // private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: ChildCaregiverReadinessAttributes
  ): Promise<ChildCaregiverReadinessAttributes | undefined | null> {
    try {
      const results = await ChildCaregiverReadiness.create(data);

      if (results) {
        await completePartialDisclosure({
          childCaregiverReadiness: results,
          childDisclosureEligibility: undefined,
        });
      }

      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async find(hospitalID: string): Promise<ChildCaregiverReadinessAttributes[]> {
    // await this.redisClient.connect();

    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
    const results = await ChildCaregiverReadiness.findAll({
      include: [
        {
          model: Patient,
          attributes: ["firstName", "middleName", "avatar"],
          where: {
            hospitalID,
          },
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

    // const results: ChildCaregiverReadinessAttributes[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(
    id: string
  ): Promise<ChildCaregiverReadinessAttributes | null | undefined> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    try {
      const results: ChildCaregiverReadiness | null =
        await ChildCaregiverReadiness.findOne({
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
  ): Promise<ChildCaregiverReadinessAttributes | null | undefined> {
    try {
      // await this.redisClient.connect();
      // if ((await this.redisClient.get(id)) === null) {
      try {
        const results: ChildCaregiverReadiness | null =
          await ChildCaregiverReadiness.findOne({
            order: [["createdAt", "DESC"]],
            where: {
              patientVisitID: id,
            },
          });

        return results;
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //
  async findByPatientId(
    id: string
  ): Promise<ChildCaregiverReadinessAttributes | null | undefined> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    try {
      const results: ChildCaregiverReadiness | null =
        await ChildCaregiverReadiness.findOne({
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
  ): Promise<ChildCaregiverReadinessAttributes[] | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results: ChildCaregiverReadiness[] | null =
      await ChildCaregiverReadiness.findAll({
        where: {
          patientVisitID: id,
        },
      });

    return results;
  }
}
