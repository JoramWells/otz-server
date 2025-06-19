
import { PatientVisitsInterface } from "otz-types";
import { validate as isUUID } from "uuid";
import { PatientVisits } from "../domain/models/patientVisits.model";
import { Patient } from "../domain/models/patients.models";
import { KafkaAdapter } from "../adapters/kafka/kafka.producer";
import { col, fn, Op, WhereOptions } from "sequelize";
import { User } from "../domain/models/user/user.model";
import {
  calculateLimitAndOffset,
  calculateMaxAge,
} from "../utils/calculateLimitAndOffset";

import { Request, Response, NextFunction } from "express";


export class PatientVisitController  {
  private readonly kafkaProducer = new KafkaAdapter();
  async create(req: Request, res: Response,next:NextFunction) {
    const results: PatientVisitsInterface = await PatientVisits.create(req.body);
    // await this.kafkaProducer.sendMessage("lab", [
    //   { value: JSON.stringify(data) },
    // ]);
    res.json (results);
  }

  async find(
    req: Request, res: Response,next:NextFunction,

  ) {
    const {hospitalID,page, pageSize, searchQuery} = req.body;
    try {
      let maxDate = calculateMaxAge(25);
      let where: WhereOptions = {
        dob: { [Op.gte]: maxDate }, // Default filter
      };
      let userWhere: WhereOptions = {};

      if (isUUID(hospitalID)) {
        userWhere = {
          ...userWhere,
          hospitalID,
        };
      }

      // Add search query filter if provided
      if (searchQuery) {
        where = {
          ...where,
          [Op.or]: [
            { firstName: { [Op.iLike]: `%${searchQuery}%` } },
            { middleName: { [Op.iLike]: `%${searchQuery}%` } },
            { cccNo: { [Op.iLike]: `%${searchQuery}%` } },
          ],
        };
      }

      //
      const { limit, offset } = calculateLimitAndOffset(page, pageSize);

      const { rows, count } = await PatientVisits.findAndCountAll({
        order: [["createdAt", "DESC"]],
        limit,
        offset,
        include: [
          {
            model: Patient,
            attributes: ["id", "firstName", "middleName", "sex", "dob"],
            where,
          },
          {
            model: User,
            where: userWhere,
            attributes: ["id", "firstName", "middleName", "sex", "dob"],
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

  async findById(    req: Request, res: Response,next:NextFunction,
): Promise<PatientVisitsInterface | null | undefined> {
    const {id} = req.params
    try {
      const results = await PatientVisits.findOne({
        order: [["createdAt", "DESC"]],
        where: {
          patientID: id,
        },
        include: [
          {
            model: User,
            attributes: ["firstName", "middleName"],
          },
        ],
      });

      return results;
    } catch (error) {
      console.log(error);
    }
  }

  //
  async findUserActivitiesCount(
     req: Request, res: Response,next:NextFunction,

  ) {
    const results = await PatientVisits.findAll({
      // where: {
      //   patientID: id,
      // },
      attributes: [[fn("COUNT", col("userID")), "count"]],
      include: [
        {
          model: User,
          attributes: ["firstName", "middleName"],
        },
      ],
      group: ["PatientVisits.userID", "User.firstName", "User.middleName"],
      raw: true,
    });

    res.json(results);
  }

  //
  async findUserPatientCount(
         req: Request, res: Response,next:NextFunction,

  ){
    const results = await PatientVisits.findAll({
      // where: {
      //   patientID: id,
      // },
      attributes: [
        [fn("DATE", col("createdAt")), "date"],
        [fn("COUNT", col("createdAt")), "count"],
      ],
      group: [fn("DATE", col("createdAt"))],
      order: [[fn("DATE", col("createdAt")), "ASC"]],
      raw: true,
    });

    res.json(results);
  }

  //
  async findPatientVisitByCount(
         req: Request, res: Response,next:NextFunction,

  ) {
    const {hospitalID} = req.body
    let maxDate = calculateMaxAge(25);
    let where: WhereOptions = {
      dob: { [Op.gte]: maxDate }, // Default filter
    };
    if (isUUID(hospitalID)) {
      where = {
        ...where,
        hospitalID,
      };
    }

    const results = await PatientVisits.findAll({
      limit: 5,
      include: [
        {
          model: Patient,
          where,
          attributes: ["id", "firstName", "middleName", "dob", "phoneNo"],
        },
      ],

      attributes: [
        [fn("COUNT", col("patientID")), "count"],
        [fn("MAX", col("PatientVisits.createdAt")), "createdAt"],
      ],
      group: [
        "patientID",
        "Patient.id",
        "Patient.firstName",
        "Patient.middleName",
      ],
      // order: [[fn("DATE", col("createdAt")), "ASC"]],
      // raw: true,
    });

    res.json (results);
  }

  async findHistoryById(

     req: Request, res: Response,next:NextFunction,

  ) {
    const {id} = req.params
        const {page,pageSize,searchQuery,hospitalID} = req.body

    try {
      const { limit, offset } = calculateLimitAndOffset(page, pageSize);

      const { rows, count } = await PatientVisits.findAndCountAll({
        order: [["createdAt", "DESC"]],
        limit,
        offset,
        include: [
          {
            model: User,
            attributes: ["firstName", "middleName"],
          },
        ],
        where: {
          patientID: id,
        },
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

  //
  async findPatientVisitByUserId(
         req: Request, res: Response,next:NextFunction,

  ){
    const {id} = req.params
    const results = await PatientVisits.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          attributes: ["firstName", "middleName"],
        },
      ],
      where: {
        patientID: id,
      },
    });

    res.json (results);
  }

  //
  async findPatientVisitCount(
         req: Request, res: Response,next:NextFunction,

  ): Promise<number | null | undefined> {
    const {id} = req.params
    try {
      const results = await PatientVisits.count({
        where: {
          patientID: id,
        },
      });

      return results;
    } catch (error) {
      console.log(error);
    }
  }
}
