/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { AppointmentAttributes, PrescriptionInterface } from 'otz-types'
import { type IPrescriptionRepository } from '../../application/interfaces/art/IPrescriptionRepository'
import { connect } from '../../domain/db/connect'

import { Prescription } from '../../domain/models/art/prescription.model'
import { calculateFacilityAdherence } from '../../utils/adherence'
import { calculatePills2 } from '../../utils/calculatePills'
import { KafkaAdapter } from '../kafka/producer/kafka.producer'
import { col, fn, Op } from 'sequelize'
import { Patient } from '../../domain/models/patients.models'


export class PrescriptionRepository implements IPrescriptionRepository {
  private readonly kafkaProducer = new KafkaAdapter()
  async create(
    data: PrescriptionInterface,
    appointmentInput: AppointmentAttributes
  ): Promise<PrescriptionInterface | null> {
    const {patientID} = appointmentInput
    const agenda = 'Refill'
    const completeInputs={
      patientID,
      agenda
    }

    return await connect.transaction(async (t) => {
      const results: PrescriptionInterface = await Prescription.create(data, {
        transaction: t,
      });

      await this.kafkaProducer.sendMessage('appointment',[{value:JSON.stringify(appointmentInput)}])
      console.log('Calling kafka appointment-topic producer...!!')
      await this.kafkaProducer.sendMessage('complete',[{value:JSON.stringify(completeInputs)}])


      return results;
    });
  }


  async find(): Promise<PrescriptionInterface[]> {
    const results = await Prescription.findAll({
      attributes: [
        //   'noOfPills',
        [fn("MAX", col("Prescription.createdAt")), "createdAt"],
        "patientID",
        "frequency",
        'refillDate',
        'nextRefillDate',
        "noOfPills",
        "expectedNoOfPills",
        "computedNoOfPills",
      ],
      where: {
        createdAt: {
          [Op.not]: null,
        },
        patientVisitID: {
          [Op.not]: null
        }
      } as any,
      include: [
        {
          model: Patient,
          attributes: ["id", "firstName", "middleName"],
        },

        // {
        //   model: ART,
        //   attributes: ['artName']
        // where: {
        //   artName: {
        //     [Op.not]: null
        //   }
        // }
        // }
      ],
      group: [
        "expectedNoOfPills",
        'computedNoOfPills',
        "frequency",
        'refillDate',
        'nextRefillDate',
        "patientID",
        "noOfPills",
        "Patient.id",
        "Patient.firstName",
        "Patient.middleName",
      ],
    });
    return results;
  }

  async findAllAdherence(): Promise<PrescriptionInterface[]> {
    const results = await calculatePills2();
    return results;
  }

  async findFacilityAdherence(): Promise<string | number> {
    const facilityAdherence = await calculateFacilityAdherence();
    return facilityAdherence;
  }

  async findDetails(id: string): Promise<PrescriptionInterface | null> {
    const results = await Prescription.findOne({
      order: [["updatedAt", "DESC"]],
      where: {
        patientID: id,
      },
    });

    return results;
  }

  async findAllPrescriptionByPatientID(
    id: string
  ): Promise<PrescriptionInterface[] | null> {
    const results = await Prescription.findAll({
      where: {
        patientID: id,
      },
    });
    return results;
  }

  async findById(id: string): Promise<PrescriptionInterface | null> {
    const results = await Prescription.findOne({
      where: {
        patientVisitID: id,
      },
      // include: [
      //   {
      //     model: ART,
      //     attributes: ["artName"],
      //     include: [
      //       {
      //         model: ArtCategory,
      //         attributes: ["artPhase"],
      //       },
      //     ],
      //   },
      // ],
    });

    return results;
  }

  //
  async findAllByPatientId(id: string): Promise<PrescriptionInterface[] | null> {
    const results = await Prescription.findAll({
      where: {
        patientID: id,
      },
      // include: [
      //   {
      //     model: ART,
      //     attributes: ["artName"],
      //     include: [
      //       {
      //         model: ArtCategory,
      //         attributes: ["artPhase"],
      //       },
      //     ],
      //   },
      // ],
    });

    return results;
  }
}
