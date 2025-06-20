// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
import { MMASEightAttributes } from "otz-types";
import { MMASFour } from "../../../domain/models/treatmentplan/mmas4.model";
import { MMASEight } from "../../../domain/models/treatmentplan/mmas8.model";
import { Patient } from "../../../domain/models/patients.models";
import {
  calculateLimitAndOffset,
  calculateMaxAge,
} from "../../../utils/calculateLimitAndOffset";
// import { createClient } from 'redis'
import { validate as isUUID } from "uuid";
import { Op, WhereOptions } from "sequelize";
import { Request, Response, NextFunction } from 'express';
import { connect } from "../../../domain/db/connect";

export class MMASEightController {


  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<MMASEightAttributes> {
    const {data,data4} = req.body;
    const { patientID, patientVisitID } = data;

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

      res.json ({
        data: rows,
        total: count,
        page: page,
        pageSize: limit,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findById(    req: Request,
    res: Response,
    next: NextFunction){
      const { id } = req.params;
    try {
      const results: MMASEight | null = await MMASEight.findOne({
        order: [["createdAt", "DESC"]],
        where: {
          id,
        },
      });

      //  await this.redisClient.set(id, JSON.stringify(results));

      res.json (results);
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
      const results: MMASEight | null = await MMASEight.findOne({
        order: [["createdAt", "DESC"]],
        where: {
          patientVisitID: id,
        },
      });

      //  await this.redisClient.set(id, JSON.stringify(results));

      res.json (results);
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
      const results: MMASEight | null = await MMASEight.findOne({
        order: [["createdAt", "DESC"]],
        where: {
          patientID: id,
        },
      });


      res.json (results);
    } catch (error) {
      console.log(error);
    }
  }
}
