import { MMASFourAttributes } from "otz-types";
import { MMASFour } from "../../../domain/models/treatmentplan/mmas4.model";
import { Patient } from "../../../domain/models/patients.models";

import {
  calculateLimitAndOffset,
  calculateMaxAge,
} from "../../../utils/calculateLimitAndOffset";
import { Op, WhereOptions } from "sequelize";
import { validate as isUUID } from "uuid";
import { Request, Response, NextFunction } from 'express';

// import { createClient } from 'redis'

export class MMASFourController {


  async create(req: Request,
    res: Response,
    next: NextFunction){

    const results = await MMASFour.create(req.body);


    res.json(results);
  }

  async find(
    req: Request,
    res: Response,
    next: NextFunction
  ){
    const { hospitalID, page, pageSize, searchQuery } = req.body;
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
        order: [['createdAt', 'DESC']],
        limit,
        offset,
        include: [
          {
            model: Patient,
            attributes: ['id', "firstName", "middleName", "avatar", 'dob', 'sex'],
            where,
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
    next: NextFunction) {
    const { id } = req.params;
    try {
      const results: MMASFour | null = await MMASFour.findOne({
        where: {
          id,
        },
      });

      

      res.json(results);
    } catch (error) {
      console.log(error);
    }
  }

  //
  async findByVisitId(
    req: Request,
    res: Response,
    next: NextFunction
  ){
    const { id } = req.params;
    try {
      // return results;
      const results: MMASFour | null = await MMASFour.findOne({
        where: {
          patientVisitID: id,
        },
      });

      

      res.json(results);
    } catch (error) {
      console.log(error);
    }
  }

  //
  async findByPatientId(
    req: Request,
    res: Response,
    next: NextFunction
  ){
    const { id } = req.params;
    try {
      const results: MMASFour | null = await MMASFour.findOne({
        where: {
          patientID: id,
        },
      });

      

      res.json(results);
    } catch (error) {
      console.log(error);
    }

  }
}
