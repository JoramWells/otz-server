/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { type IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class PatientController {
  private readonly interactor: IPatientInteractor

  constructor (interactor: IPatientInteractor) {
    this.interactor = interactor
  }

  async onCreatePatient (req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body)
      const newProfile = await this.interactor.createPatient(req.body)
      res.json(newProfile)
      next()
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async onGetAllPatients (req: Request, res: Response, next: NextFunction) {
    const PATIENT_DATA = 'patientData'

    try {
      const redisClient = createClient({ url: 'redis://redis:6379' })
      await redisClient.connect()
      if (await redisClient.get(PATIENT_DATA) === null) {
        const results = await this.interactor.getAllPatients()
        res.status(200).json(results)
        next()
        console.log('Fetched from patients db')

        // save to redis
        await redisClient.set(PATIENT_DATA, JSON.stringify(results))
        console.log('Cached data to redis')
      } else {
        const patientCache: string | null = await redisClient.get(PATIENT_DATA)
        if (patientCache === null) {
          return res.status(404).json({ error: 'Patient data not found in cache' })
        }
        res.json(JSON.parse(patientCache))
        console.log('Fetched from cache patient')
      }
    } catch (error) {
      next(error)
      res.status(500).json({ message: 'Internal Server Error' })
      console.log(error)
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
