/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { type INextOfKinInteractor } from '../../application/interfaces/INextOfKinInteractor'
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class NextOfKinController {
  private readonly interactor: INextOfKinInteractor

  constructor (interactor: INextOfKinInteractor) {
    this.interactor = interactor
  }

  async onCreateNextOfKin (req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body)
      await this.interactor.createNextOfKin(req.body)
      res.sendStatus(200)
      next()
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' })
      next(error)
    }
  }

  async onGetAllNextOfKins (req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllNextOfKins()
      res.status(200).json(results)
      next()
    } catch (error) {
      next(error)
      res.status(500).json({ message: 'Internal Server Error' })
      console.log(error)
    }
  }

  async onGetNextOfKinsById (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const result = await this.interactor.getNextOfKinById(id)
      res.status(200).json(result)
      next()
    } catch (error) {
      next(error)
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
