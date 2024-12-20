import {
  AppointmentAttributes,
  HomeVisitConfigAttributes,
  PaginatedResponseInterface,
} from "otz-types";
import { IHomeVisitRepository } from "../../../application/interfaces/homevisit/IHomeVisitRepository";
import { KafkaAdapter } from "../../kafka/producer/kafka.producer";
import { connect } from "../../../domain/db/connect";
import { Patient } from "../../../domain/models/patients.models";
import { User } from "../../../domain/models/user.model";
import { HomeVisitReason } from "../../../domain/models/homevisit/homeVisitReason.model";
import { HomeVisitFrequency } from "../../../domain/models/homevisit/homeVisitFrequency.model";
import { ART } from "../../../domain/models/art/art.model";
import { HomeVisitConfig } from "../../../domain/models/homevisit/homeVisitConfig.model";
import { PatientVisits } from "../../../domain/models/patientVisits.model";
import { Op, WhereOptions } from "sequelize";
import { validate as isUUID } from "uuid";
import {
  calculateLimitAndOffset,
  calculateMaxAge,
} from "../../../utils/calculateLimitAndOffset";

export class HomeVisitConfigRepository implements IHomeVisitRepository {
  private readonly kafkaProducer = new KafkaAdapter();

  async create(
    data: HomeVisitConfigAttributes
  ): Promise<HomeVisitConfigAttributes> {
    //

    return await connect.transaction(async (t) => {
      // await this.kafkaProducer.sendMessage("create", [
      //   { value: JSON.stringify({...appointmentInput, agenda:'Home Visit'}) },
      // ]);

      // console.log('Calling create***')

      return await HomeVisitConfig.create(data, { transaction: t });
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

    // await Promise.all([
    //   this.kafkaProducer.sendMessage("create", [
    //     {
    //       value: JSON.stringify({ ...appointmentInput, agenda: "Home Visit" }),
    //     },
    //   ]),
    //   HomeVisitConfig.create(data)
    // ]);
  }

  async find(
    hospitalID?: string,
    page?: string,
    pageSize?: string,
    searchQuery?: string
  ): Promise<
    PaginatedResponseInterface<HomeVisitConfigAttributes> | undefined | null
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
      const { rows, count } = await HomeVisitConfig.findAndCountAll({
        limit,
        offset,
        include: [
          {
            model: PatientVisits,
            attributes: ["id"],
            include: [
              {
                model: Patient,
                attributes: [
                  "id",
                  "firstName",
                  "middleName",
                  "lastName",
                  "isImportant",
                  "dob",
                  "sex"
                ],
                where,
                required: true
              },
              {
                model: User,
                attributes: ["firstName", "middleName", "lastName"],
              },
            ],
          },
          {
            model: HomeVisitReason,
            attributes: ["homeVisitReasonDescription"],
          },
        ],
      });

      // await Promise.all(
      //   results.map(async(config)=>{
      //     const user = await config.getUser()
      //     console.log(user)
      //   })
      // )

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

  async findById(id: string): Promise<HomeVisitConfigAttributes | null> {
    const results = await HomeVisitConfig.findOne({
      order: [["createdAt", "DESC"]],
      where: {
        id,
      },
      include: [
        {
          model: HomeVisitReason,
          attributes: ["id", "homeVisitReasonDescription"],
        },
        {
          model: PatientVisits,
          attributes: ["id"],
          include: [
            {
              model: Patient,
              attributes: [
                "id",
                "firstName",
                "middleName",
                "lastName",
                "isImportant",
                "dob",
                "sex",
              ],
            },
            {
              model: User,
              attributes: ["firstName", "middleName", "lastName"],
            },
          ],
        },
      ],
    });

    return results;
  }

  async findAllById(id: string): Promise<HomeVisitConfigAttributes[] | null> {
    const results = await HomeVisitConfig.findAll({
      where: {
        id,
      },
      include: [
        {
          model: User,
          attributes: ["firstName", "middleName", "lastName"],
        },
        {
          model: ART,
          attributes: ["artName"],
        },
        {
          model: HomeVisitReason,
          attributes: ["id", "homeVisitReasonDescription"],
        },
        {
          model: HomeVisitFrequency,
          attributes: ["id", "homeVisitFrequencyDescription"],
        },
      ],
    });
    return results;
  }
}
