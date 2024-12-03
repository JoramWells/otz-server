// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
// import { mmasCache } from '../../../constants/appointmentCache';
import { PartialDisclosureAttributes } from "otz-types";
import { IPartialDisclosureRepository } from "../../../../application/interfaces/disclosure/partial/IPartialDisclosureRepository";
import { PartialDisclosure } from "../../../../domain/models/treatmentplan/disclosure/partialDisclosure.model";
import { ChildCaregiverReadiness } from "../../../../domain/models/treatmentplan/disclosure/childCaregiverReadiness.model";
import { ChildDisclosureEligibility } from "../../../../domain/models/treatmentplan/disclosure/childDisclosureEligibility.model";
import { Patient } from "../../../../domain/models/patients.models";
// import { RedisAdapter } from '../redisAdapter'
// import { createClient } from 'redis'

export class PartialDisclosureRepository
  implements IPartialDisclosureRepository
{
  // private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: PartialDisclosureAttributes
  ): Promise<PartialDisclosureAttributes> {
    const results = await PartialDisclosure.create(data);

    return results;
  }

  async find(): Promise<PartialDisclosureAttributes[]> {
    // await this.redisClient.connect();

    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
    const results = await PartialDisclosure.findAll({
      include: [
        {
          model: Patient,
          attributes: ["firstName", "middleName"],
        },
        {
          model: ChildCaregiverReadiness,
          attributes: ["patientID"],
          // include: [
          //   {
          //     model: Patient,
          //     attributes:[]
          //   }
          // ]
        },
        {
          model: ChildDisclosureEligibility,
          attributes: ["patientID"],
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

    // const results: PartialDisclosureAttributes[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<PartialDisclosureAttributes | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results: PartialDisclosure | null = await PartialDisclosure.findOne({
      order: [["createdAt", "DESC"]],
      where: {
        patientID: id,
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
    // const results: PartialDisclosureAttributes = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }

  async findByPatientId(
    id: string
  ): Promise<PartialDisclosureAttributes | null | undefined> {
    try {
      // await this.redisClient.connect();
      // if ((await this.redisClient.get(id)) === null) {
      const results: PartialDisclosure | null = await PartialDisclosure.findOne(
        {
          order: [["createdAt", "DESC"]],
          where: {
            patientID: id,
          },
        }
      );

      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async findAllByVisitId(
    id: string
  ): Promise<PartialDisclosureAttributes[] | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results: PartialDisclosure[] | null = await PartialDisclosure.findAll(
      {
        where: {
          id,
        },
      }
    );

    return results;
  }
}
