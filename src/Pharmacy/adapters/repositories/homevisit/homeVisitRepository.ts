import { AppointmentAttributes, HomeVisitAttributes } from "otz-types";
import { IHomeVisitRepository } from "../../../application/interfaces/homevisit/IHomeVisitRepository";
import { KafkaAdapter } from "../../kafka/producer/kafka.producer";
import { connect } from "../../../domain/db/connect";
import { HomeVisit } from "../../../domain/models/homevisit/homeVisit.model";
import { col, fn } from "sequelize";
import { Patient } from "../../../domain/models/patients.models";
import { User } from "../../../domain/models/user.model";
import { HomeVisitReason } from "../../../domain/models/homevisit/homeVisitReason.model";
import { HomeVisitFrequency } from "../../../domain/models/homevisit/homeVisitFrequency.model";
import { ART } from "../../../domain/models/art/art.model";

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
      include: [
        {
          model: Patient,
          attributes: ["firstName", "middleName", "lastName"],
        },
        {
          model: User,
          attributes: ["firstName", "middleName", "lastName"],
        },
        {
          model: HomeVisitReason,
          attributes: ["homeVisitReasonDescription"],
        },
        {
          model: HomeVisitFrequency,
          attributes: ["homeVisitFrequencyDescription"],
        },
      ],
    });
    return results;
  }

  async findById(id: string): Promise<HomeVisitAttributes | null> {
    const results = await HomeVisit.findOne({
      order: [["createdAt", "DESC"]],
      where: {
        patientID: id,
      },
    });

    return results;
  }

  async findAllById(id: string): Promise<HomeVisitAttributes[] | null> {
    const results = await HomeVisit.findAll({
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
