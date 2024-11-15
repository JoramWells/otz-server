/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { type IARTPrescriptionInteractor } from '../../application/interfaces/art/IARTPrescriptionInteractor'
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class ARTPrescriptionController {
  private readonly interactor: IARTPrescriptionInteractor

  constructor (interactor: IARTPrescriptionInteractor) {
    this.interactor = interactor
  }

  async onCreateARTPrescription (req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body)
      const newProfile = await this.interactor.createARTPrescription(req.body)
      res.json(newProfile)
      next()
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async onGetAllARTPrescriptions (req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()
      // const {hospi}  =req.body

      const results = await this.interactor.getAllARTPrescriptions()
      res.status(200).json(results)
      next()
    } catch (error) {
      next(error)
      res.status(500).json({ message: 'Internal Server Error' })
      console.log(error)
    }
  }

  async onGetARTPrescriptionById (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const result = await this.interactor.getARTPrescriptionById(id)
      res.status(200).json(result)
      next()
    } catch (error) {
      next(error)
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
