/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { type IARTSwitchReasonInteractor } from '../../application/interfaces/art/IARTSwitchReasonInteractor'
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class ARTSwitchReasonController {
  private readonly interactor: IARTSwitchReasonInteractor

  constructor (interactor: IARTSwitchReasonInteractor) {
    this.interactor = interactor
  }

  async onCreateARTSwitchReason (req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body)
      const newProfile = await this.interactor.createARTSwitchReasons(req.body)
      res.json(newProfile)
      next()
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async onGetAllARTSwitchReasons (req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllARTSwitchReasons()
      res.status(200).json(results)
      next()
    } catch (error) {
      next(error)
      res.status(500).json({ message: 'Internal Server Error' })
      console.log(error)
    }
  }

  async onGetARTSwitchReasonByID (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const result = await this.interactor.getARTSwitchReasonsById(id)
      res.status(200).json(result)
      next()
    } catch (error) {
      next(error)
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
