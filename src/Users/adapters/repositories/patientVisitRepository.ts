/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { PatientVisitsInterface } from "otz-types";
import { validate as isUUID } from "uuid";
import { type IPatientVisitsRepository } from "../../application/interfaces/IPatientVisitsRepository";
import { PatientVisits } from "../../domain/models/patientVisits.model";
import { Patient } from "../../domain/models/patients.models";
import { KafkaAdapter } from "../kafka/kafka.producer";
import { col, fn, Op, WhereOptions } from "sequelize";
import { User } from "../../domain/models/user.model";
import { PatientVisitResponseInterface } from "../../entities/PatientVisitResponseInterface";
import {
  calculateLimitAndOffset,
  calculateMaxAge,
} from "../../utils/calculateLimitAndOffset";

export class PatientVisitRepository implements IPatientVisitsRepository {
  private readonly kafkaProducer = new KafkaAdapter();
  async create(data: PatientVisitsInterface): Promise<PatientVisitsInterface> {
    const results: PatientVisitsInterface = await PatientVisits.create(data);
    await this.kafkaProducer.sendMessage("lab", [
      { value: JSON.stringify(data) },
    ]);
    return results;
  }

  async find(
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ): Promise<PatientVisitResponseInterface | null | undefined> {
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

  async findById(id: string): Promise<PatientVisitsInterface | null> {
    const results = await PatientVisits.findOne({
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
  }

  //
  async findUserActivitiesCount(
    id: string
  ): Promise<PatientVisitsInterface[] | null> {
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

    return results;
  }

  //
  async findUserPatientCount(
    id: string
  ): Promise<PatientVisitsInterface[] | null> {
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

    return results;
  }

  //
  async findPatientVisitByCount(
    hospitalID: string
  ): Promise<PatientVisitsInterface[] | null> {
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

    return results;
  }

  async findHistoryById(
    id: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ): Promise<PatientVisitResponseInterface | null | undefined> {
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

  //
  async findPatientVisitByUserId(
    id: string
  ): Promise<PatientVisitsInterface[] | null> {
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

    return results;
  }

  //
  async findPatientVisitCount(id: string): Promise<number | null | undefined> {
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
