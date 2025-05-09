// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
import { MMASEightAttributes, MMASFourAttributes } from "otz-types";
import { IMMASEightRepository } from "../../../application/interfaces/treatmentplan/IMMAS8Repository";
import { connect } from "../../../db/connect";
import { MMASFour } from "../../../domain/models/treatmentplan/mmas4.model";
import { MMASEight } from "../../../domain/models/treatmentplan/mmas8.model";
import { RedisAdapter } from "../redisAdapter";
import { mmas8Cache } from "../../../constants/appointmentCache";
import { Patient } from "../../../domain/models/patients.models";
import {
  calculateLimitAndOffset,
  calculateMaxAge,
} from "../../../utils/calculateLimitAndOffset";
// import { createClient } from 'redis'
import { validate as isUUID } from "uuid";
import { Op, WhereOptions } from "sequelize";
import { MMASEightResponseInterface } from "../../../entities/MMASResponseInterface";

export class MMASEightRepository implements IMMASEightRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data4: MMASFourAttributes,
    data: MMASEightAttributes
  ): Promise<MMASEightAttributes> {
    const { patientID, patientVisitID } = data;

    if (await this.redisClient.get(patientID)) {
      await this.redisClient.del(patientID);
    }
    if (await this.redisClient.get(patientVisitID)) {
      await this.redisClient.del(patientVisitID);
    }
    return await connect.transaction(async (t) => {
      const mmas4Results = await MMASFour.create(data4, { transaction: t });
      const mmasFourID = mmas4Results.id;
      const results = await MMASEight.create(
        {
          mmasFourID,
          ...data,
        },
        { transaction: t }
      );

      return results;
    });
    //
  }

  async find(
    hospitalID?: string,
    page?: string,
    pageSize?: string,
    searchQuery?: string
  ): Promise<MMASEightResponseInterface | undefined | null> {
    try {
      const maxDate = calculateMaxAge(25);
      const { limit, offset } = calculateLimitAndOffset(page, pageSize);

      let where: WhereOptions = {
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
      if (searchQuery && searchQuery?.length > 0) {
        where = {
          ...where,
          [Op.or]: [
            { firstName: { [Op.iLike]: `${searchQuery}%` } },
            { middleName: { [Op.iLike]: `${searchQuery}%` } },
            { cccNo: { [Op.iLike]: `${searchQuery}%` } },
          ],
        };
      }

      const { rows, count } = await MMASEight.findAndCountAll({
        order:[['createdAt', 'DESC']],
        limit,
        offset,
        include: [
          {
            model: Patient,
            attributes: ['id',"firstName", "middleName", "avatar", 'dob', 'sex'],
            where,
          },
        ],
      });

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

  async findById(id: string): Promise<MMASEightAttributes | null | undefined> {
    try {
      const results: MMASEight | null = await MMASEight.findOne({
        order: [["createdAt", "DESC"]],
        where: {
          id,
        },
      });

      //  await this.redisClient.set(id, JSON.stringify(results));

      return results;
    } catch (error) {
      console.log(error);
    }
  }

  //

  async findByVisitId(
    id: string
  ): Promise<MMASEightAttributes | null | undefined> {
    try {
      const results: MMASEight | null = await MMASEight.findOne({
        order: [["createdAt", "DESC"]],
        where: {
          patientVisitID: id,
        },
      });

      //  await this.redisClient.set(id, JSON.stringify(results));

      return results;
    } catch (error) {
      console.log(error);
    }
  }

  //
  async findByPatientId(
    id: string
  ): Promise<MMASEightAttributes | null | undefined> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    try {
      const results: MMASEight | null = await MMASEight.findOne({
        order: [["createdAt", "DESC"]],
        where: {
          patientID: id,
        },
      });

      await this.redisClient.set(id, JSON.stringify(results));

      return results;
    } catch (error) {
      console.log(error);
    }
  }
}
