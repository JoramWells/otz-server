// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
// import { mmasCache } from '../../../constants/appointmentCache';

import { FullDisclosureAttributes } from "otz-types";
import { FullDisclosure } from "../../../../domain/models/treatmentplan/disclosure/full/fullDisclosure.model";
import {
  calculateLimitAndOffset,
  calculateMaxAge,
} from "../../../../utils/calculateLimitAndOffset";
import { col, fn, Op, Sequelize, WhereOptions } from "sequelize";
import { validate as isUUID } from "uuid";
import { Patient } from "../../../../domain/models/patients.models";
import { Request, Response, NextFunction } from 'express';
// import { RedisAdapter } from '../redisAdapter'

export class FullDisclosureController {
  // private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<FullDisclosureAttributes> {
    const results = await FullDisclosure.create(req.body);

    res.json(results);
  }

  async find(

    req: Request,
    res: Response,
    next: NextFunction
  ) {
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


      res.json({
        data: rows,
        total: count,
        page: page,
        pageSize: limit,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findById(req: Request,
    res: Response,
    next: NextFunction): Promise<FullDisclosureAttributes | null> {
    const { id } = req.params;

    const results: FullDisclosure | null = await FullDisclosure.findOne({
      order: [["createdAt", "DESC"]],
      where: {
        id,
      },
    });



    res.json(results);
  }

  async findAllByVisitId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    const results: FullDisclosure[] | null = await FullDisclosure.findAll({
      where: {
        id,
      },
    });

    res.json(results);
  }

  async findByPatientId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<FullDisclosureAttributes | null | undefined> {
    try {
      const { id } = req.params;
      const results = await FullDisclosure.findOne({
        where: {
          patientID: id,
        },
      });

      res.json(results);
    } catch (error) {
      console.log(error);
    }
  }
  async findFullDisclosureScoreCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { hospitalID } = req.body;
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
      const results = await FullDisclosure.findAll({
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
      res.json(results);
    } catch (error) {
      console.log(error);
    }
  }
}
