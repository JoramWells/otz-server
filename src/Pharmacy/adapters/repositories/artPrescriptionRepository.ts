/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import {  ARTPrescriptionInterface } from 'otz-types'
import { type IARTPrescriptionRepository } from '../../application/interfaces/art/IARTPrescriptionRepository'
import { ART } from '../../domain/models/art/art.model'
import { ARTPrescription } from '../../domain/models/art/artPrescription.model'
import { KafkaAdapter } from '../kafka/producer/kafka.producer';
import { connect } from '../../domain/db/connect';

export class ARTPrescriptionRepository implements IARTPrescriptionRepository {
  private readonly kafkaProducer = new KafkaAdapter();

  async create(
    data: ARTPrescriptionInterface
  ): Promise<ARTPrescriptionInterface> {
    //


    return await connect.transaction(async(t)=>{
    return await ARTPrescription.create(
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

  async find(): Promise<ARTPrescriptionInterface[]> {
    const results = await ARTPrescription.findAll({
      include: [
        {
          model: ART,
          attributes: ["artName"],
        },
      ],
    });
    return results;
  }

  async findById(id: string): Promise<ARTPrescriptionInterface | null> {
    const results = await ARTPrescription.findOne({
      order: [["createdAt", "DESC"]],
      where: {
        patientID: id,
      },
    });

    return results;
  }
}
