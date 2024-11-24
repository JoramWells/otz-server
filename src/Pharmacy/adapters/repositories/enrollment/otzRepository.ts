/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { OTZEnrollmentsInterface } from "otz-types";

import { IOTZRepository } from "../../../application/interfaces/enrollment/IOTZRepository";
import {
  OTZ,
  OTZResponseInterface,
} from "../../../domain/models/enrollment/otz.model";
import { Patient } from "../../../domain/models/patients.models";
import { User } from "../../../domain/models/user.model";
import { ARTPrescription } from "../../../domain/models/art/artPrescription.model";
import { ViralLoad } from "../../../domain/models/lab/viralLoad.model";
import { Op } from "sequelize";

export class OTZRepository implements IOTZRepository {
  async create(
    data: OTZEnrollmentsInterface
  ): Promise<OTZEnrollmentsInterface> {
    const results: OTZEnrollmentsInterface = await OTZ.create(data);
    return results;
  }

  async find(
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ): Promise<OTZResponseInterface> {
    //
    //
    const where = searchQuery
      ? {
          [Op.or]: [
            { firstName: { [Op.iLike]: `%${searchQuery}%` } },
            { middleName: { [Op.iLike]: `%${searchQuery}%` } },
            { cccNo: { [Op.iLike]: `%${searchQuery}%` } },
          ],
          hospitalID,
        }
      : {
          hospitalID,
        };

    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const { rows, count } = await OTZ.findAndCountAll({
      limit: limit ? limit : 10,
      offset: offset ? offset : 0,
      include: [
        {
          model: Patient,
          attributes: ["firstName", "middleName", "dob", "sex"],
          where,
        },
        {
          model: User,
          attributes: ["firstName", "middleName"],
        },
        // {
        //   model: ARTPrescription,
        //   attributes: ["regimen", "line", "startDate"],
        // },
        // {
        //   model: ViralLoad,
        //   attributes:['vlResults', 'dateOfVL']
        // }
      ],
    });
    return {
      data: rows,
      total: count,
      page: page,
      pageSize: limit,
    };
  }

  async findById(id: string): Promise<OTZEnrollmentsInterface | null> {
    const results = await OTZ.findOne({
      include: [
        {
          model: Patient,
          attributes: ["firstName", "middleName", "dob", "sex"],
        },
        {
          model: User,
          attributes: ["firstName", "middleName"],
        },
        {
          model: ARTPrescription,
          attributes: ["regimen", "line", "startDate"],
        },
        {
          model: ViralLoad,
          attributes: ["vlResults", "dateOfVL", "vlJustification"],
        },
      ],
      where: {
        id,
      },
    });

    return results;
  }
  async delete(id: string): Promise<number | null> {
    // await this.redisClient.del(patientCache);
    // await this.redisClient.del(id as string);
    const results: number | null = await OTZ.destroy({
      where: {
        id,
      },
    });
    console.log("deleted cache!!");

    return results;
  }
}
