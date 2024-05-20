/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { type IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { logger } from '../../utils/logger'
import { type NextOfKinEntity } from '../../domain/entities/NextOfKinEntity'
import { type PatientEntity } from '../../domain/entities/PatientEntity'
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class PatientController {
  private readonly interactor: IPatientInteractor

  constructor (interactor: IPatientInteractor) {
    this.interactor = interactor
  }

  async onCreatePatient (req: Request, res: Response, next: NextFunction) {
    const {
      firstName,
      middleName,
      lastName,
      sex,
      dob,
      phoneNo,
      occupationID,
      idNo,
      cccNo,
      location,
      maritalStatus,

      kinFirstName,
      kinLastName,
      kinGender,
      kinDOB,
      kinIDNo,
      nextOfKinPhoneNo,
      relationship
    } = req.body

    const patientData: PatientEntity = {
      firstName,
      middleName,
      lastName,
      sex,
      dob,
      phoneNo,
      occupationID,
      idNo,
      cccNo,
      location,
      maritalStatus
    }

    const nextOfKinData: NextOfKinEntity = {
      relationship,
      certificateNo: '',
      firstName: kinFirstName,
      middleName: kinLastName,
      sex: kinGender,
      dob: kinDOB,
      idNo: kinIDNo,
      phoneNo: nextOfKinPhoneNo
    }
    try {
      // console.log(nextOfKinData)
      await this.interactor.createPatient(patientData, nextOfKinData)
      res.sendStatus(200)
      logger.info({
        message: 'Created New Patient Successfully! ~' + req.body.firstName
      })
      next()
    } catch (error) {
      console.log(error)
      logger.error(error)
      res.status(500).json({ message: 'Internal Server Error' })
      next(error)
    }
  }

  async onGetAllPatients (req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllPatients()
      res.status(200).json(results)
      logger.info({ message: 'Fetched all Patients Successfully!' })

      next()
    } catch (error) {
      next(error)
      logger.error(error)
      res.status(500).json({ message: 'Internal Server Error' })
      // console.log(error)
    }
  }

  async onGetAllPMTCTPatients (req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.findAllPMTCTPatients()
      res.status(200).json(results)
      logger.info({ message: 'Fetched all Patients Successfully!' })

      next()
    } catch (error) {
      next(error)
      logger.error(error)
      res.status(500).json({ message: 'Internal Server Error' })
      // console.log(error)
    }
  }

  //

  async onGetAllOTZPatients (req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.findAllOTZPatients()
      res.status(200).json(results)
      logger.info({ message: 'Fetched all Patients Successfully!' })

      next()
    } catch (error) {
      next(error)
      logger.error(error)
      res.status(500).json({ message: 'Internal Server Error' })
      // console.log(error)
    }
  }

  async onGetPatientById (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const result = await this.interactor.getPatientById(id)
      res.status(200).json(result)
      next()
    } catch (error) {
      next(error)
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
