/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { PatientVisitsInterface } from "otz-types";
import { type IPatientVisitsRepository } from "../../application/interfaces/IPatientVisitsRepository";
import { PatientVisits } from "../../domain/models/patientVisits.model";
import { Patient } from "../../domain/models/patients.models";
import { KafkaAdapter } from "../kafka/kafka.producer";
import { col, fn, Op } from "sequelize";
import { User } from "../../domain/models/user.model";
import { PatientVisitResponseInterface } from "../../entities/PatientVisitResponseInterface";

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
      const currentDate = new Date();
      let maxDate = new Date(
        currentDate.getFullYear() - 25,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      let where = {
        dob: { [Op.gte]: maxDate }, // Default filter
      };
      let userWhere = {};

      if (hospitalID) {
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
      const offset = (page - 1) * pageSize;
      const limit = pageSize;

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

  async findHistoryById(id: string): Promise<PatientVisitsInterface[] | null> {
    const results = await PatientVisits.findAll({
      where: {
        patientID: id,
      },
    });

    return results;
  }

  //
  async findPatientVisitByUserId(
    id: string
  ): Promise<PatientVisitsInterface[] | null> {
    const results = await PatientVisits.findAll({
      where: {
        patientID: id,
      },
    });

    return results;
  }
}
