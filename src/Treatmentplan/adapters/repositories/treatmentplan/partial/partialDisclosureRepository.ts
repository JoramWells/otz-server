// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
// import { mmasCache } from '../../../constants/appointmentCache';
import { PartialDisclosureAttributes } from "otz-types";
import { IPartialDisclosureRepository } from "../../../../application/interfaces/disclosure/partial/IPartialDisclosureRepository";
import { PartialDisclosure } from "../../../../domain/models/treatmentplan/disclosure/partialDisclosure.model";
import { ChildCaregiverReadiness } from "../../../../domain/models/treatmentplan/disclosure/childCaregiverReadiness.model";
import { ChildDisclosureEligibility } from "../../../../domain/models/treatmentplan/disclosure/childDisclosureEligibility.model";
import { Patient } from "../../../../domain/models/patients.models";
import { validate as isUUID } from "uuid";

import {
  calculateLimitAndOffset,
  calculateMaxAge,
} from "../../../../utils/calculateLimitAndOffset";
import { col, fn, Op, Sequelize, WhereOptions } from "sequelize";
import { PartialDisclosureResponseInterface } from "../../../../entities/PartialDisclosureResponseInterface";
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

  async find(
    hospitalID: string | undefined,
    page: string | undefined,
    pageSize: string | undefined,
    searchQuery: string
  ): Promise<PartialDisclosureResponseInterface | null | undefined> {
    // await this.redisClient.connect();
    try {
      const maxDate = calculateMaxAge(25);
      const { limit, offset } = calculateLimitAndOffset(page, pageSize);

      //
      let where = {
        dob: {
          [Op.gte]: maxDate,
        },
      };
      //
      if (isUUID(hospitalID)) {
        where = {
          ...where,
          hospitalID,
        };
      }

      //
      if (searchQuery?.length > 0) {
        where = {
          ...where,
          [Op.or]: [
            { firstName: { [Op.iLike]: `${searchQuery}%` } },
            { middleName: { [Op.iLike]: `${searchQuery}%` } },
            { cccNo: { [Op.iLike]: `${searchQuery}%` } },
          ],
        };
      }
      // check if patient
      // if ((await this.redisClient.get(mmasCache)) === null) {
      const { rows, count } = await PartialDisclosure.findAndCountAll({
        limit,
        offset,
        include: [
          {
            model: Patient,
            attributes: ["firstName", "middleName"],
            where,
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
      return {
        data: rows,
        total: count,
        page: page,
        pageSize: limit,
      };
    } catch (error) {
      console.log(error);
    }
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

  async findPartialDisclosureScoreCategory(
    hospitalID: string | undefined
  ): Promise<PartialDisclosureAttributes[] | undefined | null> {
    try {
      let where: WhereOptions = {
        dob: {
          [Op.between]: [
            new Date().setFullYear(new Date().getFullYear() - 9),
            new Date().setFullYear(new Date().getFullYear() - 5),
          ],
        },
      };

      if (isUUID(hospitalID)) {
        where = {
          ...where,
          hospitalID,
        };
      }
      return await PartialDisclosure.findAll({
        include: [
          {
            model: Patient,
            attributes: [],
            where,
          },
        ],
        attributes: [
          [
            Sequelize.literal(`
            CASE
            WHEN score  < 4 THEN '25%'
            WHEN score >= 4 AND score < 8 THEN '50%'
            WHEN score >= 8 AND score < 11 THEN '75%'
            WHEN score >= 10 THEN '100%'
            ELSE '0%'
            END
            `),
            "status",
          ],
          [fn("COUNT", "*"), "count"],
          [fn("MAX", col("PartialDisclosure.createdAt")), "latestCreatedAt"],
        ],
        group: ["status"],
      });
    } catch (error) {
      console.log(error);
    }
  }
}
