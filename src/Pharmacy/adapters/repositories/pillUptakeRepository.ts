/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import moment from 'moment'
// import { pillUptakeCache } from '../../../constants/appointmentCache'
// import { RedisAdapter } from '../redisAdapter'
import { Sequelize } from 'sequelize'
import { type IPillUptakeRepository } from '../../application/interfaces/art/IPillUptakeRepository'
import { Adherence, type AdherenceAttributes } from '../../domain/models/adherence/adherence.model'
import { type AdherenceEntity } from '../../domain/entities/art/AdherenceEntity'
import { TimeAndWork } from '../../domain/models/adherence/timeAndWork.model'
import { Patient } from '../../domain/models/patients.models'
import { Prescription } from '../../domain/models/art/prescription.model'

export class PillUptakeRepository implements IPillUptakeRepository {
  async count () {
    const currentDate = moment().format('YYYY-MM-DD')

    //
    const results = await Adherence.findOne({
      attributes: [
        [
          Sequelize.literal(
            'SUM(CASE WHEN "morningStatus" = true THEN 1 ELSE 0 END)'
          ),
          'morningTrueCount'
        ],
        [
          Sequelize.literal(
            'SUM(CASE WHEN "morningStatus" = false THEN 1 ELSE 0 END)'
          ),
          'morningFalseCount'
        ],
        [
          Sequelize.literal(
            'SUM(CASE WHEN "eveningStatus" = true THEN 1 ELSE 0 END)'
          ),
          'eveningTrueCount'
        ],
        [
          Sequelize.literal(
            'SUM(CASE WHEN "eveningStatus" = false THEN 1 ELSE 0 END)'
          ),
          'eveningFalseCount'
        ]
      ],
      where: {
        currentDate
      }
    })

    return results
  }

  // private readonly redisClient = new RedisAdapter()
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create (data: AdherenceEntity): Promise<AdherenceEntity> {
    const results: AdherenceAttributes = await Adherence.create(data)

    return results
  }

  async find (): Promise<AdherenceEntity[]> {
    const currentDate = moment().format('YYYY-MM-DD')
    // await this.redisClient.connect();
    // check if patient
    // if ((await this.redisClient.get(pillUptakeCache)) === null) {
    const results = await Adherence.findAll({
      where: {
        currentDate
      },
      include: {
        model: TimeAndWork,
        attributes: ['id', 'morningMedicineTime', 'eveningMedicineTime'],
        include: [
          {
            model: Patient,
            attributes: ['id', 'firstName', 'middleName']
          }
        ]
      }
    })

    // logger.info({ message: "Fetched from db!" });
    // console.log("fetched from db!");
    // set to cace
    //   await this.redisClient.set(pillUptakeCache, JSON.stringify(results));

    //   return results;
    // }
    // const cachedPatients: string | null = await this.redisClient.get(
    //   pillUptakeCache
    // );
    // if (cachedPatients === null) {
    //   return [];
    // }
    // await this.redisClient.disconnect();
    // logger.info({ message: "Fetched from cache!" });
    // console.log("fetched from cache!");

    // const results: AdherenceEntity[] = JSON.parse(cachedPatients);
    return results
  }

  async findById (id: string): Promise<AdherenceEntity | null> {
    // await this.redisClient.connect()
    // if ((await this.redisClient.get(id)) === null) {
    const results: AdherenceAttributes | null = await Adherence.findOne({
      where: {
        id
      }
    })

    // const patientResults: AppointmentEntity = {
    //   firstName: results?.firstName,
    //   middleName: results?.middleName,
    //   sex: results?.sex,
    //   phoneNo: results?.phoneNo,
    //   idNo: results?.idNo,
    //   occupationID: results?.occupationID,
    // };
    // await this.redisClient.set(id, JSON.stringify(results))

    //   return results
    // }

    // const cachedData: string | null = await this.redisClient.get(id)
    // if (cachedData === null) {
    //   return null
    // }
    // const results: AdherenceAttributes = JSON.parse(cachedData)
    // console.log('fetched from cace!')

    return results
  }

  async edit (id: string, status: boolean, query: ParsedQs): Promise<AdherenceEntity | null> {
    if (query === 'morning') {
      const results = await Adherence.findOne({
        where: {
          id
        }
      })

      if (results) {
        const pResults = await Prescription.findOne({
          where: {
            id: results?.prescriptionID
          }
        })
        console.log(pResults, 'mornin..')
        console.log(status, 'lko')
        if (pResults) {
          if (status) {
            pResults?.computedNoOfPills = pResults?.computedNoOfPills + 1
          } else {
            pResults?.computedNoOfPills = pResults?.computedNoOfPills - 1
          }
          await pResults?.save()
        }

        results.morningStatus = status
        await results.save()
      }
    } else {
      const results = await Adherence.findOne({
        where: {
          id
        }
      })
      if (results) {
        const pResults = await Prescription.findOne({
          where: {
            id: results?.prescriptionID
          }
        })
        console.log(pResults, 'evnin')
        if (pResults) {
          if (status) {
            pResults?.computedNoOfPills = pResults?.computedNoOfPills + 1
            console.log('substrct..')
          } else {
            pResults?.computedNoOfPills = pResults?.computedNoOfPills - 1
            console.log('added............................................')
          }
          await pResults?.save()
        }

        results.eveningStatus = status
        await results.save()
      }

      return results
    }
  }
}
