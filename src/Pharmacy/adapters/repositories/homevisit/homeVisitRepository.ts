import { AppointmentAttributes, HomeVisitAttributes } from "otz-types";
import { IHomeVisitRepository } from "../../../application/interfaces/homevisit/IHomeVisitRepository";
import { KafkaAdapter } from "../../kafka/producer/kafka.producer";
import { connect } from "../../../domain/db/connect";
import { HomeVisit } from "../../../domain/models/homevisit/homeVisit.model";
import { HomeVisitConfig } from "../../../domain/models/homevisit/homeVisitConfig.model";
import { Patient } from "../../../domain/models/patients.models";
import { HomeVisitReason } from "../../../domain/models/homevisit/homeVisitReason.model";
import { PatientVisits } from "../../../domain/models/patientVisits.model";


export class HomeVisitRepository implements IHomeVisitRepository {
  private readonly kafkaProducer = new KafkaAdapter();

  async create(data: HomeVisitAttributes, appointmentInput: AppointmentAttributes): Promise<HomeVisitAttributes> {
    //

    return await connect.transaction(async (t) => {
      await this.kafkaProducer.sendMessage("create", [
        { value: JSON.stringify({...appointmentInput, agenda:'Home Visit'}) },
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


  async find(): Promise<HomeVisitAttributes[]> {
    const results = await HomeVisit.findAll({
      // include: [
      //   {
      //     model: HomeVisitConfig,
      //     attributes: ["frequency"],
      //     include: [
      //       {
      //         model: Patient,
      //         attributes: ['id',"firstName", "middleName"],
      //       },
      //     ],
      //   },
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
      // ],
    });
    return results;
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
