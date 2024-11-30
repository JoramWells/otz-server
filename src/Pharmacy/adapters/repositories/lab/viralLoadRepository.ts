/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */

import { ViralLoadInterface } from "otz-types";
import { IViralLoadRepository } from "../../../application/interfaces/lab/IViralLoadRepository";
import { ViralLoad } from "../../../domain/models/lab/viralLoad.model";
import { Patient } from "../../../domain/models/patients.models";
import { User } from "../../../domain/models/user.model";
import { PatientVisits } from "../../../domain/models/patientVisits.model";
import { col, fn, literal } from "sequelize";
import { KafkaAdapter } from "../../kafka/producer/kafka.producer";
import { connect } from "../../../domain/db/connect";
import { Appointment } from "../../../domain/models/appointment/appointment.model";
import { markAsCompletedAppointment } from "../../../utils/markAsCompletedAppointment";

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
      const results = await ViralLoad.create(
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
      );
      if (results) {
        // await Appointment.create(
        //   {
        //     userID,
        //     patientID,
        //     patientVisitID,
        //     appointmentAgendaID,
        //     appointmentStatusID,
        //     appointmentDate,
        //   },
        //   { transaction: t }
        // );
        await markAsCompletedAppointment(patientID, "viral load");
      }
      return results;
    });
    await this.kafkaProducer.sendMessage("complete", [
      {
        value: JSON.stringify({ patientID, agenda: "viral load" }),
      },
    ]);
    return results;
  }

  async find(hospitalID: string): Promise<ViralLoadInterface[]> {
    const {rows, count} = await ViralLoad.findAndCountAll({
      limit:10,
      offset:5,
      include: [
        {
          model: Patient,
          attributes: ["firstName", "middleName", "dob", "sex"],
          where: {
            hospitalID: hospitalID,
          },
        },
        // {
        //   model: PatientVisits,
        // attributes: ["firstName", "middleName"],
        //   include: [
        //     {
        //       model: User,
        //       where: {
        //         hospitalID: hospitalID,
        //       },
        //     },
        //   ],
        // },
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
    // console.log(results, 'resultx')
    return rows;
  }

  async findSuppressionRate(hospitalID: string, startDate: string | Date, endDate: Date | string): Promise<ViralLoadInterface[]> {
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
      group:['ViralLoad.id']
      // where,
    });
    console.log(results, 'resultxs')
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
