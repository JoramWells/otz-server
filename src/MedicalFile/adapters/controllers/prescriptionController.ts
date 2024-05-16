/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { type IPrescriptionInteractor } from '../../application/interfaces/art/IPrescriptionInteractor'
// import { Patient } from '../../domain/entities/Patient'

export class PrescriptionController {
  private readonly interactor: IPrescriptionInteractor

  constructor (interactor: IPrescriptionInteractor) {
    this.interactor = interactor
  }

  async onCreatePrescription (req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body)
      const newProfile = await this.interactor.createPrescription(req.body)
      res.status(200).json(newProfile)
      next()
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async onGetAllPrescriptions (req: Request, res: Response, next: NextFunction) {
    try {
      const results = await this.interactor.getAllPrescriptions()
      res.status(200).json(results)
      next()
    } catch (error) {
      next(error)
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  async onGetPrescriptionById (req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const result = await this.interactor.getPrescriptionById(id)
      res.status(200).json(result)
      next()
    } catch (error) {
      next(error)
      console.log(error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
