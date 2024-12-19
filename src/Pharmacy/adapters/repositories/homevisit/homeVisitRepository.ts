import {
  AppointmentAttributes,
  HomeVisitAttributes,
  PaginatedResponseInterface,
} from "otz-types";
import { IHomeVisitRepository } from "../../../application/interfaces/homevisit/IHomeVisitRepository";
import { KafkaAdapter } from "../../kafka/producer/kafka.producer";
import { connect } from "../../../domain/db/connect";
import { HomeVisit } from "../../../domain/models/homevisit/homeVisit.model";
import { HomeVisitConfig } from "../../../domain/models/homevisit/homeVisitConfig.model";
import { Patient } from "../../../domain/models/patients.models";
import { PatientVisits } from "../../../domain/models/patientVisits.model";
import {
  calculateLimitAndOffset,
  calculateMaxAge,
} from "../../../utils/calculateLimitAndOffset";
import { Op, WhereOptions } from "sequelize";
import { validate as isUUID } from "uuid";

export class HomeVisitRepository implements IHomeVisitRepository {
  private readonly kafkaProducer = new KafkaAdapter();

  async create(
    data: HomeVisitAttributes,
    appointmentInput: AppointmentAttributes
  ): Promise<HomeVisitAttributes> {
    //

    return await connect.transaction(async (t) => {
      await this.kafkaProducer.sendMessage("create", [
        {
          value: JSON.stringify({ ...appointmentInput, agenda: "Home Visit" }),
        },
      ]);
      return await HomeVisit.create(data, { transaction: t });
      // if (data.appointmentAgendaID) {
      // await this.kafkaProducer.sendMessage("appointment", [
      //   { value: JSON.stringify(appointmentInput2) },
      // ]);
      // await Appointment.create(appointmentInput2, { transaction: t });

      //

      // console.log("Prescribing...!!");
      // }

      // return results;
    });
  }

  async find(
    hospitalID?: string,
    page?: string,
    pageSize?: string,
    searchQuery?: string
  ): Promise<
    PaginatedResponseInterface<HomeVisitAttributes> | undefined | null
  > {
    try {
      const maxDate = calculateMaxAge(25);
      const { limit, offset } = calculateLimitAndOffset(page, pageSize);

      let where: WhereOptions = {
        dob: {
          [Op.gte]: maxDate,
        },
      };

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

      const { rows, count } = await HomeVisit.findAndCountAll({
        order: [["createdAt", "DESC"]],
        limit,
        offset,
        include: [
          {
            model: HomeVisitConfig,
            attributes: ["frequency"],
            include: [
              {
                model: Patient,
                attributes: [
                  "id",
                  "firstName",
                  "middleName",
                  "avatar",
                  "dob",
                  "sex",
                ],
                where,
              },
            ],
          },
          // {
          //   model: User,
          //   attributes: ["firstName", "middleName", "lastName"],
          // },
          //   {
          //     model: HomeVisitReason,
          //     attributes: ["homeVisitReasonDescription"],
          //   },
          //   {
          //     model: HomeVisitFrequency,
          //     attributes: ["homeVisitFrequencyDescription"],
          //   },
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

  async findById(id: string): Promise<HomeVisitAttributes | null> {
    // const results2 = await HomeVisit.findByPk(id)
    const results = await HomeVisit.findOne({
      order: [["createdAt", "DESC"]],
      where: {
        id,
      },
      include: [
        {
          model: HomeVisitConfig,
          attributes: ["frequency"],
          include: [
            {
              model: PatientVisits,
              // attributes: ["id", "firstName", "middleName"],
              include: [
                {
                  model: Patient,
                  attributes: ["id", "firstName", "middleName"],
                },
              ],
              //   },
              //   {
              //     model: HomeVisitReason,
              //     attributes: ["homeVisitReasonDescription"],
            },
          ],
        },
      ],
    });
    // console.log(results2?.getPatient())

    return results;
  }

  async findAllById(id: string): Promise<HomeVisitAttributes[] | null> {
    const results = await HomeVisit.findAll({
      where: {
        homeVisitConfigID: id,
      },
      // include: [
      //   {
      //     model: HomeVisitReason,
      //     attributes: ["id", "homeVisitReasonDescription"],
      //   },

      // ],
    });
    return results;
  }
}
