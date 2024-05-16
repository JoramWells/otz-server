/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type IPatientRepository } from '../../application/interfaces/IPatientRepository'
import { patientCache } from '../../constants'
import { connect } from '../../domain/db/connect'
import { type NextOfKinEntity } from '../../domain/entities/NextOfKinEntity'
import { type PatientEntity } from '../../domain/entities/PatientEntity'
import { Hospital } from '../../domain/models/hospital/hospital.model'
import { NextOfKin } from '../../domain/models/nextOfKin.model'
import { PatientVisits } from '../../domain/models/patientVisits.model'
import { Patient } from '../../domain/models/patients.models'
import { School } from '../../domain/models/school/school.model'
import { logger } from '../../utils/logger'
// import { createClient } from 'redis'
import { RedisAdapter } from './redisAdapter'

export class PatientRepository implements IPatientRepository {
  private readonly redisClient = new RedisAdapter()
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create (data: PatientEntity, nextOfKinData: NextOfKinEntity): Promise<string | null> {
    // const { firstName, middleName, lastName, dob, phoneNo, cccNo, occupationID, sex, hospitalID, schoolID, idNo } = data
    console.log(nextOfKinData)
    let results = ''
    await connect.transaction(async (t) => {
      const results = await Patient.create(data, { transaction: t })

      //
      if (results) {
        const patientID = results.id
        await NextOfKin.create({
          patientID,
          ...nextOfKinData
        }, { transaction: t })

        // create new visit
        await PatientVisits.create({ patientID }, { transaction: t })
      }
    }).then(() => {
      results = 'Successfully registered a New Patient'
    })

    // const patientEntity: PatientEntity = {
    //   id: results.id,
    //   firstName: results.firstName,
    //   middleName,
    //   sex,
    //   occupationID,
    //   phoneNo,
    //   idNo
    // }

    return results
  }

  async find (): Promise<PatientEntity[]> {
    await this.redisClient.connect()
    // check if patient
    if (await this.redisClient.get(patientCache) === null) {
      const results = await Patient.findAll({
        include: [
          { model: School, attributes: ['schoolName'] },
          {
            model: Hospital,
            attributes: ['hospitalName']
          }
        //   {
        //     model: ViralLoad,
        //     attributes: [
        //       'id',
        //       'dateOfNextVL',
        //       'vlResults',
        //       'isValid',
        //       'dateOfCurrentVL'
        //     ]
        //   }
        ]
      })
      logger.info({ message: 'Fetched from db!' })
      console.log('fetched from db!')
      // set to cace
      await this.redisClient.set(patientCache, JSON.stringify(results))

      return results
    }
    const cachedPatients: string | null = await this.redisClient.get(patientCache)
    if (cachedPatients === null) {
      return []
    }
    // await this.redisClient.disconnect()
    logger.info({ message: 'Fetched from cache!' })
    console.log('fetched from cache!')

    const results: PatientEntity[] = JSON.parse(cachedPatients)
    return results
  }

  async findById (id: string): Promise<PatientEntity | null> {
    // await this.redisClient.connect()
    // if (await this.redisClient.get(id) === null) {
    //   const results: Patient | null = await Patient.findOne({
    //     where: {
    //       id
    //     }
    //   })

    //   const patientResults: PatientEntity = {
    //     firstName: results?.firstName,
    //     middleName: results?.middleName,
    //     sex: results?.sex,
    //     phoneNo: results?.phoneNo,
    //     idNo: results?.idNo,
    //     occupationID: results?.occupationID
    //   }
    //   await this.redisClient.set(id, JSON.stringify(patientResults))

    //   return patientResults
    // }

    // const cachedData: string | null = await this.redisClient.get(id)
    // if (cachedData === null) {
    //   return null
    // }
    // const results: PatientEntity = JSON.parse(cachedData)
    // console.log('fetched patient from cace!')
    const results: Patient | null = await Patient.findOne({
      where: {
        id
      }
    })
    if (results === null) {
      console.log(results, 'resultx')
    }
    console.log(results, 'founde')

    return results
  }
}
