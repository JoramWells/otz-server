import { NextFunction, Request, Response } from "express";
import { IPatientInteractor } from "../../application/interfaces/IPatientInteractor";
import { Patient } from "../../domain/entities/Patient";

export class PatientController {
  private interactor: IPatientInteractor;

  constructor(interactor: IPatientInteractor) {
    this.interactor = interactor;
  }

  async onCreatePatient(req: Request, res: Response, next: NextFunction) {
    try {
      const newProfile = await this.interactor.createPatient(req.body);
      res.json(newProfile);
      next();
    } catch (error) {
      next(error);
    }
  }

  async onGetAllPatients(req: Request, res: Response, next: NextFunction) {
    try {
        const results = await this.interactor.getAllPatients()
        res.status(200).json(results)
        next()
        
    } catch (error) {
        next(error)
        res.status(500).json({message:'Internal Server Error'})
    }
  }
}