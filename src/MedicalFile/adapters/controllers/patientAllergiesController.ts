/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { type IPatientAllergiesInteractor } from '../../application/interfaces/IPatientAllergiesInteractor'
// import { createClient } from 'redis'
export class PatientAllergiesController {
  private readonly interactor: IPatientAllergiesInteractor

  constructor (interactor: IPatientAllergiesInteractor) {
    this.interactor = interactor
  }

  async onCreatePatientAllergies (req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body)
      const newProfile = await this.interactor.createPatientAllergies(req.body)
      res.json(newProfile)
      next()
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async onGetAllPatientAllergies (req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllPatientAllergies()
      res.status(200).json(results)
      next()
    } catch (error) {
      next(error)
      res.status(500).json({ message: 'Internal Server Error' })
      console.log(error)
    }
  }

  async onGetPatientAllergiesById (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params
      const result = await this.interactor.getPatientAllergiesById(id)
      res.status(200).json(result)
      next()
    } catch (error) {
      next(error)
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
