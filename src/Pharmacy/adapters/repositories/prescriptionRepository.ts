/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { AppointmentAttributes, PrescriptionInterface } from "otz-types";
import { type IPrescriptionRepository } from "../../application/interfaces/art/IPrescriptionRepository";
import { connect } from "../../domain/db/connect";

import { Prescription } from "../../domain/models/art/prescription.model";
import { calculateFacilityAdherence } from "../../utils/adherence";
import {
  calculateAdherenceRateTimeSeries,
  calculatePills2,
} from "../../utils/calculatePills";
import { KafkaAdapter } from "../kafka/producer/kafka.producer";
import { col, fn, Op, Sequelize } from "sequelize";
import { Patient } from "../../domain/models/patients.models";
import { ARTPrescription } from "../../domain/models/art/artPrescription.model";
import { ImportantPatient } from "../../domain/models/importantPatients";
import { PatientVisits } from "../../domain/models/patientVisits.model";

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

    return await connect.transaction(async (t) => {
      const results: PrescriptionInterface = await Prescription.create(data, {
        transaction: t,
      });

      // find last prescription

      await this.kafkaProducer.sendMessage("create", [
        { value: JSON.stringify({ ...appointmentInput, agenda: "Refill" }) },
      ]);
      // await this.kafkaProducer.sendMessage('complete',[{value:JSON.stringify(completeInputs)}])

      return results;
    });
  }

  async find(
    dateQuery: string,
    hospitalID: string
  ): Promise<PrescriptionInterface[]> {
    const currentDate = new Date();
    const maxDate = new Date(
      currentDate.getFullYear() - 26,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    if (dateQuery === "all") {
      const results = await Prescription.findAll({
        include: [
          {
            model: Patient,
            attributes: ["id", "firstName", "middleName", "isImportant", "dob"],
            where: {
              dob: {
                [Op.gte]: maxDate,
              },
            },
          },
          {
            model: PatientVisits,
            where: {
              hospitalID,
            },
          },

          {
            model: ARTPrescription,
            attributes: ["regimen"],
          },
        ],
      });

      return results;
    }

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
        "artPrescriptionID",
        // 'Patient.id',
        // "noOfPills",
        // "Patient.id",
        // "Patient.firstName",
        // "Patient.middleName",
      ],
      raw: true,
    });

    const results = await Prescription.findAll({
      order: [["updatedAt", "ASC"]],
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
          attributes: ["id", "firstName", "middleName", "isImportant", "dob"],
          // include: [
          //   {
          //     model: ImportantPatient,
          //     attributes: ["userID"],
          //   },
          // ],
        },

        {
          model: ARTPrescription,
          attributes: ["regimen"],
        },
      ],
      attributes: [
        "id",
        "expectedNoOfPills",
        "computedNoOfPills",
        "frequency",
        "refillDate",
        "nextRefillDate",
        "patientID",
        "artPrescriptionID",
        "patientVisitID",
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
    const facilityAdherence = await calculateAdherenceRateTimeSeries();
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
      include: [
        {
          model: ARTPrescription,
          attributes: ["regimen"],
          // include: [
          //   {
          //     model: ArtCategory,
          //     attributes: ["artPhase"],
          //   },
          // ],
        },
        {
          model: Patient,
          attributes: ["firstName", "middleName"],
        },
      ],
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

    //

    return results;
  }

  async edit(
    data: PrescriptionInterface
  ): Promise<PrescriptionInterface | null> {
    const {
      id,
      frequency,
      noOfPills,
      expectedNoOfPills,
      nextRefillDate,
      refillDate,
    } = data;

    // et patientVisitID

    // delete cache
    // await this.redisClient.del(patientCache);
    // await this.redisClient.del(id as string);

    const results = await Prescription.findByPk(id);

    if (results) {
      // const nextRefillDate = new Date(results.refillDate)
      // const daysToAdd = parseInt(results.noOfPills, 10) / parseInt(frequency, 10);
      // nextRefillDate.setDate(nextRefillDate.getDate() + daysToAdd)

      const currentAppointment = {
        patientVisitID: results.patientVisitID,
        appointmentDate: nextRefillDate as unknown as string,
        agenda: "Refill",
      };

      await this.kafkaProducer.sendMessage("frequency", [
        { value: JSON.stringify(currentAppointment) },
      ]);

      // console.log('kafkaing!!..')

      results.frequency = frequency;
      results.noOfPills = noOfPills;
      results.expectedNoOfPills = expectedNoOfPills;
      results.nextRefillDate = nextRefillDate;
      results.refillDate = refillDate;
      await results.save();
    }
    return results;
  }

  //
  async getRecentPrescriptionByPatientID(
    id: string
  ): Promise<PrescriptionInterface | null> {
    const currentDate = new Date();
    const results = await Prescription.findOne({
      order: [["createdAt", "DESC"]],
      where: {
        patientID: id,
        createdAt: {
          [Op.not]: currentDate,
        },
      },
    });

    //
    if (results) {
      results.isCompleted = true;
      results.save();
    }
    return results;
  }
}
