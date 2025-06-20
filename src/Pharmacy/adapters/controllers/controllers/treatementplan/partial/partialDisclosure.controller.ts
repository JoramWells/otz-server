
import { PartialDisclosureAttributes } from "otz-types";
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
import { Request, Response, NextFunction } from 'express';


export class PartialDisclosureController{

  async create(
      req: Request,
        res: Response,
        next: NextFunction
  ): Promise<PartialDisclosureAttributes> {
    const results = await PartialDisclosure.create(data);

    return results;
  }

  async find(

      req: Request,
        res: Response,
        next: NextFunction
  ): Promise<PartialDisclosureResponseInterface | null | undefined> {
       
    const { hospitalID, page, pageSize, searchQuery } = req.body;
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

  async findById(  req: Request,
        res: Response,
        next: NextFunction): Promise<PartialDisclosureAttributes | null> {
        const { id } = req.params;

    const results: PartialDisclosure | null = await PartialDisclosure.findOne({
      order: [["createdAt", "DESC"]],
      where: {
        patientID: id,
      },
    });


    return results;
  }

  async findByPatientId(
     req: Request,
        res: Response,
        next: NextFunction
  ): Promise<PartialDisclosureAttributes | null | undefined> {
    try {
          const { id } = req.params;

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
     req: Request,
        res: Response,
        next: NextFunction
  ): Promise<PartialDisclosureAttributes[] | null> {
    const { id } = req.params;
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
      req: Request,
        res: Response,
        next: NextFunction
  ): Promise<PartialDisclosureAttributes[] | undefined | null> {
    const { id:hospitalID } = req.params;
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
