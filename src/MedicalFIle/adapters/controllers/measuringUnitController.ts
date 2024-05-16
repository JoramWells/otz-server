/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { type IMeasuringUnitInteractor } from '../../application/interfaces/art/IMeasuringUnitInteractor'
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class MeasuringUnitController {
  private readonly interactor: IMeasuringUnitInteractor

  constructor (interactor: IMeasuringUnitInteractor) {
    this.interactor = interactor
  }

  async onCreateMeasuringUnit (req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body)
      const newProfile = await this.interactor.createMeasuringUnit(req.body)
      res.json(newProfile)
      next()
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async onGetAllARTCategories (req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllMeasuringUnits()
      res.status(200).json(results)
      next()
    } catch (error) {
      next(error)
      res.status(500).json({ message: 'Internal Server Error' })
      console.log(error)
    }
  }

  async onGetMeasuringUnitById (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const result = await this.interactor.getMeasuringUnitById(id)
      res.status(200).json(result)
      next()
    } catch (error) {
      next(error)
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
