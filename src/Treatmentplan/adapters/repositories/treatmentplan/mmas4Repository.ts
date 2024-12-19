// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
import { MMASFourAttributes } from "otz-types";
import { IMMASFourRepository } from "../../../application/interfaces/treatmentplan/IMMAS4Repository";
import { MMASFour } from "../../../domain/models/treatmentplan/mmas4.model";
import { RedisAdapter } from "../redisAdapter";
import { mmas4Cache } from "../../../constants/appointmentCache";
import { Patient } from "../../../domain/models/patients.models";
import { MMASFourResponseInterface } from "../../../entities/MMASResponseInterface";
import {
  calculateLimitAndOffset,
  calculateMaxAge,
} from "../../../utils/calculateLimitAndOffset";
import { Op, WhereOptions } from "sequelize";
import { validate as isUUID } from "uuid";

// import { createClient } from 'redis'

export class MMASFourRepository implements IMMASFourRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(data: MMASFourAttributes): Promise<MMASFourAttributes> {
    const { patientID, patientVisitID } = data;
    const results = await MMASFour.create(data);
    // if(await this.redisClient.get(patientID)){
    //   await this.redisClient.del(patientID)
    // }
    //  if (await this.redisClient.get(patientVisitID)) {
    //    await this.redisClient.del(patientVisitID);
    //  }
    // await this.redisClient.del(mmas4Cache);

    return results;
  }

  async find(
    hospitalID?: string,
    page?: string,
    pageSize?: string,
    searchQuery?: string
  ): Promise<MMASFourResponseInterface | undefined | null> {
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

      const { rows, count } = await MMASFour.findAndCountAll({
        order:[['createdAt', 'DESC']]
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

  async findById(id: string): Promise<MMASFourAttributes | null | undefined> {
    try {
      const results: MMASFour | null = await MMASFour.findOne({
        where: {
          id,
        },
      });

      await this.redisClient.set(id, JSON.stringify(results));

      return results;
    } catch (error) {
      console.log(error);
    }
  }

  //
  async findByVisitId(
    id: string
  ): Promise<MMASFourAttributes | null | undefined> {
    try {
      // return results;
      const results: MMASFour | null = await MMASFour.findOne({
        where: {
          patientVisitID: id,
        },
      });

      await this.redisClient.set(id, JSON.stringify(results));

      return results;
    } catch (error) {
      console.log(error);
    }
  }

  //
  async findByPatientId(
    id: string
  ): Promise<MMASFourAttributes | null | undefined> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    try {
      const results: MMASFour | null = await MMASFour.findOne({
        where: {
          patientID: id,
        },
      });

      await this.redisClient.set(id, JSON.stringify(results));

      return results;
    } catch (error) {
      console.log(error);
    }
    // }

    // const cachedData: string | null = await this.redisClient.get(id);
    // if (cachedData === null) {
    //   return null;
    // }
    // const results: MMASFourAttributes = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    // return results;
  }
}
