/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { type IPrescriptionInteractor } from '../../application/interfaces/art/IPrescriptionInteractor'
import { AppointmentAttributes, PrescriptionInterface } from 'otz-types'
import { logger } from '../../utils/logger';
// import { Patient } from '../../domain/entities/Patient'

export class PrescriptionController {
  private readonly interactor: IPrescriptionInteractor;

  constructor(interactor: IPrescriptionInteractor) {
    this.interactor = interactor;
  }

  async onCreatePrescription(req: Request, res: Response, next: NextFunction) {
    const {
      artPrescriptionID,
      noOfPill,
      frequency,
      refillDate,
      userID,
      patientID,
      patientVisitID,
      appointmentAgendaID,
      appointmentStatusID,
    } = req.body;

    const nextRefillDate = new Date(refillDate);
    const daysToAdd = parseInt(noOfPill, 10) / parseInt(frequency, 10);
    nextRefillDate.setDate(nextRefillDate.getDate() + daysToAdd);

    const appointmentInput: AppointmentAttributes = {
      userID,
      patientID,
      patientVisitID,
      appointmentAgendaID,
      appointmentStatusID,
      appointmentDate: nextRefillDate as unknown as string,
    };

    const prescriptionInput: PrescriptionInterface = {
      patientVisitID,
      artPrescriptionID,
      frequency,
      refillDate,
      noOfPills: noOfPill,
      patientID,
      nextRefillDate,
    };

    try {
      const newProfile = await this.interactor.createPrescription(
        prescriptionInput,
        appointmentInput
      );
      res.status(200).json(newProfile);
      next();
    } catch (error) {
      console.log(error);
      logger.error(error)
      next(error);
    }
  }

  async onGetAllPrescriptions(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await this.interactor.getAllPrescriptions();
      res.status(200).json(results);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async onGetPrescriptionById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getPrescriptionById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  async onGetPrescriptionByPatientId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getAllPrescriptionByPatientId(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //

  async onGetFacilityAdherence(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.interactor.getFacilityAdherence();
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  async onGetPrescriptionDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      if(id==='undefined') return;
      const result = await this.interactor.getPrescriptionDetails(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
