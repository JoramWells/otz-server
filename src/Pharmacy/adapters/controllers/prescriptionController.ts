/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { type IPrescriptionInteractor } from '../../application/interfaces/art/IPrescriptionInteractor'
import { AppointmentAttributes, PrescriptionInterface } from 'otz-types'
import { logger } from '../../utils/logger';
import {validate as isUUID} from 'uuid'
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
      expectedNoOfPills: noOfPill,
      patientID,
      nextRefillDate,
    };

    try {
      const newProfile = await this.interactor.createPrescription(
        prescriptionInput,
        appointmentInput
      );

      if(patientID){
        console.log("Marking patient as completed!!");
        await this.interactor.findRecentRecentByPatientID(patientID)
      }

      res.status(200).json(newProfile);
      next();
    } catch (error) {
      console.log(error);
      logger.error(error);
      next(error);
    }
  }

  async onGetAllPrescriptions(req: Request, res: Response, next: NextFunction) {
    try {
      const {mode, hospitalID} = req.query

      if (!hospitalID || hospitalID === "undefined")
        return res.status(400).json({ message: "Invalid ID parameter" });

      if (!isUUID(hospitalID)) {
        const errMessage = `${hospitalID} is not a valid UUID `;
        logger.error(errMessage);
        return res.status(404).json({ error: errMessage });
      }
      const results = await this.interactor.getAllPrescriptions(mode as string, hospitalID as string);
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
      if (id === "undefined") return null;
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
  async onGetPrescriptionByPatientId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      if (id === "undefined") return null;

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
  async onEditPrescription(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (id === "undefined") return null;
      const { frequency, noOfPills, expectedNoOfPills, refillDate, nextRefillDate }: PrescriptionInterface = req.body;
      console.log(req.body)
      const values: PrescriptionInterface = {
        id,
        frequency,
        noOfPills,
        expectedNoOfPills,
        refillDate,
        nextRefillDate
      };

      const results = await this.interactor.editPrescription(values);
      res.status(200).json(results);
    } catch (error) {
      console.log(error);
    }
  }

  //
  async onFindRecentPrescriptionByPatientID(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    if (id === "undefined") return null;

    try {
      const result = await this.interactor.findRecentRecentByPatientID(
        id
      );
      if (!isUUID(id)) {
        const errMessage = `${id} is not a valid UUID `;
        logger.error(errMessage);
        return res.status(404).json({ error: errMessage });
      }
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
      if (id === "undefined") return;
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
