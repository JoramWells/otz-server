/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { AppointmentAttributes, PrescriptionInterface } from "otz-types";
import { type IPrescriptionRepository } from "../../application/interfaces/art/IPrescriptionRepository";
import { connect } from "../../domain/db/connect";

import { Prescription } from "../../domain/models/art/prescription.model";
import { calculateFacilityAdherence } from "../../utils/adherence";
import { calculatePills2 } from "../../utils/calculatePills";
import { KafkaAdapter } from "../kafka/producer/kafka.producer";
import { col, fn, Op, Sequelize } from "sequelize";
import { Patient } from "../../domain/models/patients.models";
import { ARTPrescription } from "../../domain/models/art/artPrescription.model";

export class PrescriptionRepository implements IPrescriptionRepository {
  private readonly kafkaProducer = new KafkaAdapter();
  async create(
    data: PrescriptionInterface,
    appointmentInput: AppointmentAttributes
  ): Promise<PrescriptionInterface | null> {
    const { patientID } = appointmentInput;
    const agenda = "Refill";
    const completeInputs = {
      patientID,
      agenda,
    };

    console.log(data, "pData");

    return await connect.transaction(async (t) => {
      const results: PrescriptionInterface = await Prescription.create(data, {
        transaction: t,
      });

      await this.kafkaProducer.sendMessage("create", [
        { value: JSON.stringify({ ...appointmentInput, agenda: "Refill" }) },
      ]);
      // await this.kafkaProducer.sendMessage('complete',[{value:JSON.stringify(completeInputs)}])

      return results;
    });
  }

  async find(): Promise<PrescriptionInterface[]> {
    console.log("finding...");
    const latestPrescription = await Prescription.findAll({
      attributes: [
        //   'noOfPills',
        [fn("MAX", col("createdAt")), "latestCreatedAt"],
        "patientID",
      ],
      group: [
        // "expectedNoOfPills",
        // 'computedNoOfPills',
        // "frequency",
        // 'refillDate',
        // 'nextRefillDate',
        "patientID",
        'artPrescriptionID'
        // 'Patient.id',
        // "noOfPills",
        // "Patient.id",
        // "Patient.firstName",
        // "Patient.middleName",
      ],
      raw: true,
    });

    const results = await Prescription.findAll({
      where: {
        [Op.and]: [
          {
            patientID: {
              [Op.in]: latestPrescription.map(
                (prescription) => prescription.patientID
              ),
            },
          },
          Sequelize.where(
            col("Prescription.createdAt"),
            Op.eq,
            Sequelize.literal(
              `(SELECT MAX("createdAt") FROM Prescriptions WHERE "patientID" = "Prescription"."patientID")`
            )
          ),
        ],
      },
      include: [
        {
          model: Patient,
          attributes: ["id", "firstName", "middleName", "isImportant"],
        },

        {
          model: ARTPrescription,
          attributes: ['regimen']
    
        }
      ],
      attributes: [
        "expectedNoOfPills",
        "computedNoOfPills",
        "frequency",
        "refillDate",
        "nextRefillDate",
        "patientID",
        "artPrescriptionID",
        // 'Patient.id',
        "noOfPills",
        // "Patient.id",
        // "Patient.firstName",
        // "Patient.middleName",
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
  async findAllByPatientId(
    id: string
  ): Promise<PrescriptionInterface[] | null> {
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
