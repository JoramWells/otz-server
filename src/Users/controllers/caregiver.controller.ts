/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { CaregiverInterface } from 'otz-types'
import { Caregiver } from '../domain/models/caregiver.model'
import { Patient } from '../domain/models/patients.models'
import { Request, Response, NextFunction } from "express";

export class CaregiverController {
  async create (
     req: Request, res: Response,
        next: NextFunction
  ): Promise<CaregiverInterface> {
    const results: CaregiverInterface = await Caregiver.create(req.body)

    return results
  }

  async find (   req: Request, res: Response,
        next: NextFunction){
    const results = await Caregiver.findAll({
      include: [
        {
          model: Patient,
          attributes: ['firstName', 'middleName']
        }
      ]
    })
    res.json (results)
  }

  async findById (

       req: Request, res: Response,
        next: NextFunction
  ): Promise<CaregiverInterface[] | null> {
    const {id} = req.params
    const results = await Caregiver.findAll({
      where: {
        patientID: id
      }
    })

    return results
  }
}
