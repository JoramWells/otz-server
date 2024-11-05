/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import {  ARTPrescriptionInterface } from 'otz-types'
import { type IARTPrescriptionRepository } from '../../application/interfaces/art/IARTPrescriptionRepository'
import { ART } from '../../domain/models/art/art.model'
import { ARTPrescription } from '../../domain/models/art/artPrescription.model'
import { KafkaAdapter } from '../kafka/producer/kafka.producer';
import { connect } from '../../domain/db/connect';
import { col, fn, Op, Sequelize } from 'sequelize';

export class ARTPrescriptionRepository implements IARTPrescriptionRepository {
  private readonly kafkaProducer = new KafkaAdapter();

  async create(
    data: ARTPrescriptionInterface
  ): Promise<ARTPrescriptionInterface> {
    //

    const {patientID, regimen} = data
    const results = await ARTPrescription.findOne({
      where: {
        patientID,
        regimen,
        [Op.and]:{
          isStopped: false
        }
      },
    }); 

    if(results){
      // patient already exists!!
      return results
    }

    return await connect.transaction(async(t)=>{
    return await ARTPrescription.create(
      data,{transaction:t}
    );

    })


  }

  async find(): Promise<ARTPrescriptionInterface[]> {
    const latestArtPrescription = await ARTPrescription.findAll({
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
        // 'Patient.id',
        // "noOfPills",
        // "Patient.id",
        // "Patient.firstName",
        // "Patient.middleName",
      ],
    });

    // 
        // const results = await ARTPrescription.findAll({
        //   where: {
        //     [Op.or]: latestArtPrescription.map((date) => ({
        //       patientID: date.patientID,
        //       createdAt: date.get("latestCreatedAt"),
        //     })),
        //   } as any,

        //   attributes: [
        //     "patientID",
        //     "regimen",
        //     "changeReason",
        //     "stopReason",
        //     "startDate",
        //     "stopDate",
        //     "changeDate",
        //     // 'Patient.id',
        //     "line",
        //     // "Patient.id",
        //     // "Patient.firstName",
        //     // "Patient.middleName",
        //   ],
        // });

        const results  = ARTPrescription.findAll({
          order:[['createdAt', 'DESC']],
          where:{
            isSwitched: false
          }
          // limit: 1
        })
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
