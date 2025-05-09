// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
// import { mmasCache } from '../../../constants/appointmentCache';

import { FullDisclosureAttributes } from "otz-types";
import { IFullDisclosureRepository } from "../../../../application/interfaces/disclosure/full/IFullDisclosureRepository";
import { FullDisclosure } from "../../../../domain/models/treatmentplan/disclosure/full/fullDisclosure.model";
import { FullDisclosureResponseInterface } from "../../../../entities/FullDisclosureResponseInterface";
import {
  calculateLimitAndOffset,
  calculateMaxAge,
} from "../../../../utils/calculateLimitAndOffset";
import { col, fn, Op, Sequelize, WhereOptions } from "sequelize";
import { validate as isUUID } from "uuid";
import { Patient } from "../../../../domain/models/patients.models";

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

  async find(
    hospitalID: string | undefined,
    page: string | undefined,
    pageSize: string | undefined,
    searchQuery: string
  ): Promise<FullDisclosureResponseInterface | undefined | null> {
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

      const { rows, count } = await FullDisclosure.findAndCountAll({
        limit,
        offset,
        include: [
          {
            model: Patient,
            where,
            attributes: ["firstName", "middleName"],
          },
        ],
      });

      // logger.info({ message: "Fetched from db!" });
      // console.log("fetched from db!");
      // set to cace
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
  async findFullDisclosureScoreCategory(
    hospitalID: string | undefined
  ): Promise<FullDisclosureAttributes[] | undefined | null> {
    try {
      let where: WhereOptions = {
        dob: {
          [Op.between]: [
            new Date().setFullYear(new Date().getFullYear() - 14),
            new Date().setFullYear(new Date().getFullYear() - 10),
          ],
        },
      };

      if (isUUID(hospitalID)) {
        where = {
          ...where,
          hospitalID,
        };
      }
      return await FullDisclosure.findAll({
        include: [
          {
            model: Patient,
            where,
            attributes: [],
            // required: true,
          },
        ],
        attributes: [
          [
            Sequelize.literal(`
            CASE
            WHEN score  < 5 THEN '25%'
            WHEN score >= 5 AND score < 10 THEN '50%'
            WHEN score >= 10 AND score < 15 THEN '75%'
            WHEN score >= 15 THEN '100%'
            ELSE '0%'
            END
            `),
            "status",
          ],
          [fn("COUNT", "*"), "count"],
          [fn("MAX", col("FullDisclosure.createdAt")), "latestCreatedAt"],
        ],
        group: ["status"],
      });
    } catch (error) {
      console.log(error);
    }
  }
}
