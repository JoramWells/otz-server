/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { type IPMTCTProfileInteractor } from '../../application/interfaces/IPMTCTProfileInteractor'
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class PMTCTProfileController {
  private readonly interactor: IPMTCTProfileInteractor

  constructor (interactor: IPMTCTProfileInteractor) {
    this.interactor = interactor
  }

  async onCreatePMTCTProfile (req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body)
      const newProfile = await this.interactor.createPMTCTProfile(req.body)
      res.json(newProfile)
      next()
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async onGetAllPMTCTProfiles (req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllPMTCTProfiles()
      res.status(200).json(results)
      next()
    } catch (error) {
      next(error)
      res.status(500).json({ message: 'Internal Server Error' })
      console.log(error)
    }
  }

  async onGetPMTCTProfileById (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const result = await this.interactor.getPMTCTProfileById(id)
      res.status(200).json(result)
      next()
    } catch (error) {
      next(error)
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
