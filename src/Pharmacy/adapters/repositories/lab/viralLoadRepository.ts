/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */

import { ViralLoadInterface } from "otz-types";
import { IViralLoadRepository } from "../../../application/interfaces/lab/IViralLoadRepository";
import { ViralLoad } from "../../../domain/models/lab/viralLoad.model";
import { Patient } from "../../../domain/models/patients.models";
import { col, fn, literal, Op } from "sequelize";
import { KafkaAdapter } from "../../kafka/producer/kafka.producer";
import { connect } from "../../../domain/db/connect";
import { Appointment } from "../../../domain/models/appointment/appointment.model";
import { markAsCompletedAppointment } from "../../../utils/markAsCompletedAppointment";
import { ViralLoadResponseInterface } from "../../../entities/ViralLoadResponseInterface";

export class ViralLoadRepository implements IViralLoadRepository {
  private readonly kafkaProducer = new KafkaAdapter();

  async create(data: ViralLoadInterface): Promise<ViralLoadInterface> {
    const {
      userID,
      patientID,
      patientVisitID,
      appointmentAgendaID,
      appointmentStatusID,
      appointmentDate,
      dateOfVL,
      dateOfNextVL,
      vlResults,
      vlJustification,
    } = data;

    const results = await connect.transaction(async (t) => {

     return await Promise.all([
        ViralLoad.create(
          {
            userID,
            dateOfVL,
            dateOfNextVL,
            vlResults,
            vlJustification,
            patientVisitID,
            patientID,
          },
          { transaction: t }
        ),
        Appointment.create(
          {
            userID,
            patientID,
            patientVisitID,
            appointmentAgendaID,
            appointmentStatusID,
            appointmentDate,
          },
          { transaction: t }
        ),
        markAsCompletedAppointment(patientID, "viral load"),
      ]);
      // return results;
    });
    await this.kafkaProducer.sendMessage("complete", [
      {
        value: JSON.stringify({ patientID, agenda: "viral load" }),
      },
    ]);
    return results;
  }

  async find(
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ): Promise<ViralLoadResponseInterface | undefined | null> {
    try {
      const currentDate = new Date();
      let maxDate = new Date(
        currentDate.getFullYear() - 24,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      let where = {
        hospitalID,
        dob: { [Op.gte]: maxDate }, // Default filter
      };

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
      const offset = (page - 1) * pageSize;
      const limit = pageSize;
      const { rows, count } = await ViralLoad.findAndCountAll({
        limit,
        offset,
        include: [
          {
            model: Patient,
            attributes: ["id", "firstName", "middleName", "dob", "sex"],
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

  async findSuppressionRate(
    hospitalID: string,
    startDate: string | Date,
    endDate: Date | string
  ): Promise<ViralLoadInterface[]> {
    try {
      let where = {};
      let patientWhere = {};
      if (startDate && endDate) {
        where = {
          ...where,
          createdAt: {
            [Op.between]: { startDate, endDate },
          },
        };
      }

      if (hospitalID) {
        patientWhere = {
          ...patientWhere,
          hospitalID,
        };
      }

      const results = await ViralLoad.findAll({
        limit: 10,
        // include: [
        //   {
        //     model: Patient,
        //     where: patientWhere,
        //     attributes:[]
        //   },
        // ],
        attributes: [
          [fn("DATE_TRUNC", "month", col("ViralLoad.createdAt")), "month"],
          [
            literal(`
        CASE 
          WHEN COUNT(*) = 0 THEN 0 
          ELSE 
            (SUM(CASE WHEN "vlResults" <= 50 AND "isVLValid" = true THEN 1 ELSE 0 END)::FLOAT 
            / 
            COUNT(*)) * 100
        END
      `),
            "suppressionRate",
          ],
        ],
        group: ["ViralLoad.id"],
        // where,
      });
      console.log(results, "resultxs");
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id: string): Promise<ViralLoadInterface | null> {
    const results = await ViralLoad.findOne({
      order: [["createdAt", "DESC"]],

      // include: [
      //   {
      //     model: Patient,
      //     attributes: ["firstName", "middleName", "dob", "sex"],
      //   },
      //   {
      //     model: User,
      //     attributes: ["firstName", "middleName"],
      //   },
      //   {
      //     model: ARTPrescription,
      //     attributes: ["regimen", "line", "startDate"],
      //   },
      //   {
      //     model: ViralLoad,
      //     attributes: ["vlResults", "dateOfVL", "vlJustification"],
      //   },
      // ],
      where: {
        patientID: id,
      },
    });

    return results;
  }

  //
  async findByPatientId(id: string): Promise<ViralLoadInterface[] | null> {
    const results = await ViralLoad.findAll({
      // include: [
      //   {
      //     model: Patient,
      //     attributes: ["firstName", "middleName", "dob", "sex"],
      //   },
      //   {
      //     model: User,
      //     attributes: ["firstName", "middleName"],
      //   },
      //   {
      //     model: ARTPrescription,
      //     attributes: ["regimen", "line", "startDate"],
      //   },
      //   {
      //     model: ViralLoad,
      //     attributes: ["vlResults", "dateOfVL", "vlJustification"],
      //   },
      // ],
      where: {
        patientID: id,
      },
    });

    return results;
  }

  //
  async findCategories(id: string): Promise<ViralLoadInterface[] | null> {
    const results = await ViralLoad.findAll({
      include: [
        {
          model: Patient,
          attributes: [],
          where: {
            hospitalID: id,
          },
        },
      ],
      attributes: [
        [
          literal(`CASE
      WHEN "vlResults"::numeric < 50 THEN 'LDL'
      WHEN "vlResults"::numeric BETWEEN 50 AND 199 THEN 'Low RiskLLV'
      WHEN "vlResults"::numeric BETWEEN 200 AND 999 THEN 'High Risk LLV'
      ELSE 'Suspected Treatment Failure'
      END`),
          "category",
        ],
        [fn("COUNT", col("*")), "count"],
      ],
      group: ["category"],
    });

    return results;
  }
}
