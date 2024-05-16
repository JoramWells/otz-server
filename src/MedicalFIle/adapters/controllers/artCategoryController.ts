/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { type IARTCategoryInteractor } from '../../application/interfaces/art/IARTCateoryInteractor'
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class ARTCategoryController {
  private readonly interactor: IARTCategoryInteractor

  constructor (interactor: IARTCategoryInteractor) {
    this.interactor = interactor
  }

  async onCreateARTCategory (req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body)
      const newProfile = await this.interactor.createARTCategory(req.body)
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

      const results = await this.interactor.getAllARTCategories()
      res.status(200).json(results)
      next()
    } catch (error) {
      next(error)
      res.status(500).json({ message: 'Internal Server Error' })
      console.log(error)
    }
  }

  async onGetARTCategoryById (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const result = await this.interactor.getARTCategoryById(id)
      res.status(200).json(result)
      next()
    } catch (error) {
      next(error)
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
