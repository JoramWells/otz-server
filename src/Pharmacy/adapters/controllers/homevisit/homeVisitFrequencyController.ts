/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { IHomeVisitFrequencyInteractor } from '../../../application/interfaces/homevisit/IHomeVisitFrequencyInteractor'

export class HomeVisitFrequencyController {
  private readonly interactor: IHomeVisitFrequencyInteractor

  constructor (interactor: IHomeVisitFrequencyInteractor) {
    this.interactor = interactor
  }

  async onCreateHomeVisitFrequency (req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body)
      const newProfile = await this.interactor.createHomeVisitFrequency(req.body)
      res.json(newProfile)
      next()
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async onGetAllHomeVisitFrequencies (req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllHomeVisitFrequencies()
      res.status(200).json(results)
      next()
    } catch (error) {
      next(error)
      res.status(500).json({ message: 'Internal Server Error' })
      console.log(error)
    }
  }

  async onGetHomeVisitFrequencyById (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const result = await this.interactor.getHomeVisitFrequencyById(id)
      res.status(200).json(result)
      next()
    } catch (error) {
      next(error)
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
