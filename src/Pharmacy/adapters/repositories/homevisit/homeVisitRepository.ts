import { HomeVisitAttributes } from "otz-types";
import { IHomeVisitRepository } from "../../../application/interfaces/homevisit/IHomeVisitRepository";
import { KafkaAdapter } from "../../kafka/producer/kafka.producer";
import { connect } from "../../../domain/db/connect";
import { HomeVisit } from "../../../domain/models/homevisit/homeVisit.model";
import { col, fn } from "sequelize";
import { Patient } from "../../../domain/models/patients.models";
import { User } from "../../../domain/models/user.model";
import { HomeVisitReason } from "../../../domain/models/homevisit/homeVisitReason.model";
import { HomeVisitFrequency } from "../../../domain/models/homevisit/homeVisitFrequency.model";


export class HomeVisitRepository implements IHomeVisitRepository {
  private readonly kafkaProducer = new KafkaAdapter();

  async create(
    data: HomeVisitAttributes
  ): Promise<HomeVisitAttributes> {
    //


    return await connect.transaction(async(t)=>{
    return await HomeVisit.create(
      data,{transaction:t}
    );
    // if (data.appointmentAgendaID) {
      // await this.kafkaProducer.sendMessage("appointment", [
      //   { value: JSON.stringify(appointmentInput2) },
      // ]);
      // await Appointment.create(appointmentInput2, { transaction: t });

      //
      // await this.kafkaProducer.sendMessage("complete", [
      //   { value: JSON.stringify(completeInputs) },
      // ]);
      // console.log("Prescribing...!!");
    // }


    // return results;
    })


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
}
