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
      console.log(req.body)
      const newProfile = await this.interactor.createPatient(req.body);
      res.json(newProfile);
      next();
    } catch (error) {
      
      console.log(error)
      next(error);
    }
  }

  async onGetAllPatients(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await this.interactor.getAllPatients();
      res.status(200).json(results);
      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error)
    }
  }

  async onGetPatientById(req: Request, res: Response, next: NextFunction){
    try {
      const {id} = req.params;
      const result = await this.interactor.getPatientById(id)
      res.status(200).json(result)
      next()
    } catch (error) {
      next(error)
      res.status(500).json({message:'Internal Server Error'})
      
    }
  }
}