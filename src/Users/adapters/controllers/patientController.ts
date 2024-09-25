/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { type IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { logger } from '../../utils/logger'
import { NextOfKinInterface, PatientAttributes } from 'otz-types';
import { validationResult } from 'express-validator';
import {validate as isUUID} from 'uuid'
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class PatientController {
  private readonly interactor: IPatientInteractor;

  constructor(interactor: IPatientInteractor) {
    this.interactor = interactor;
  }

  async onCreatePatient(req: Request, res: Response, next: NextFunction) {
    // validate
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      firstName,
      middleName,
      lastName,
      sex,
      dob,
      phoneNo,
      occupationID,
      idNo,
      cccNo,
      location,
      maritalStatus,
      entryPoint,
      kinFirstName,
      kinLastName,
      kinGender,
      kinDOB,
      kinIDNo,
      nextOfKinPhoneNo,
      relationship,
      role,
    } = req.body;

    const patientData: PatientAttributes = {
      firstName,
      middleName,
      role,
      lastName,
      sex,
      dob,
      phoneNo,
      occupationID,
      idNo,
      cccNo,
      location,
      maritalStatus,
      entryPoint,
    };

    const nextOfKinData: NextOfKinInterface = {
      relationship,
      certificateNo: "",
      firstName: kinFirstName,
      middleName: kinLastName,
      sex: kinGender,
      dob: kinDOB,
      idNo: kinIDNo,
      phoneNo: nextOfKinPhoneNo,
    };

    try {
      // console.log(nextOfKinData)
      await this.interactor.createPatient(patientData, nextOfKinData);
      res.status(200).json([]);
      logger.info({
        message: "Created New Patient Successfully! ~" + req.body.firstName,
      });
      next();
    } catch (error) {
      console.log(error);
      logger.error(error);
      res.status(500).json({ message: "Internal Server Error" });
      next(error);
    }
  }

  async onGetAllPatients(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllPatients();
      res.status(200).json(results);
      logger.info({ message: "Fetched all Patients Successfully!" });

      next();
    } catch (error) {
      next(error);
      logger.error(error);
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }

  async onGetAllPMTCTPatients(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.findAllPMTCTPatients();
      res.status(200).json(results);
      logger.info({ message: "Fetched all Patients Successfully!" });

      next();
    } catch (error) {
      next(error);
      logger.error(error);
      res.status(500).json({ message: "Internal Server Error" });
      // console.log(error)
    }
  }

  //

  async onGetAllOTZPatients(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.findAllOTZPatients();
      res.status(200).json(results);
      logger.info({ message: "Fetched all Patients Successfully!" });

      next();
    } catch (error) {
      next(error);
      logger.error(error);
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }

  async onGetPatientById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (id === "undefined") {
        logger.error("This id is undefined");
        return null;
      }
      if (!isUUID(id)) {
        const errMessage = `${id} is not a valid UUID `;
        logger.error(errMessage);
        return res.status(404).json({ error: errMessage });
      }
      const result = await this.interactor.getPatientById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async onEditPatientProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (id === "undefined") return null;
      const {
        firstName,
        middleName,
        lastName,
        phoneNo,
        role,
      }: PatientAttributes = req.body;
      const values: PatientAttributes = {
        id,
        firstName,
        middleName,
        lastName,
        phoneNo,
        role,
        //
        maritalStatus: "",
      };

      const results = await this.interactor.editPatient(values);
      res.status(200).json(results);
    } catch (error) {
      console.log(error);
    }
  }

  //
  async onUpdatePatientProfileAvatar(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (id === "undefined") return null;
      const avatar = req.file?.filename;
 

      const results = await this.interactor.updateAvatar(id, avatar);
      res.status(200).json(results);
    } catch (error) {
      console.log(error);
    }
  }

  //
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, password } = req.body;
      const results = await this.interactor.login(firstName, password);
      res.status(200).json(results);
      next();
    } catch (error) {
      next(error);

      console.log(error);
    }
  }

  //
  async onMarkAsImportant(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { isImportant } = req.body;
      const results = await this.interactor.markAsImportant(id, isImportant);
      res.status(200).json(results);
      next();
    } catch (error) {
      next(error);

      console.log(error);
    }
  }

  //
  async onGetImportantPatient(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit } = req.body;
      const results = await this.interactor.getImportantPatient(limit);
      res.status(200).json(results);
      next();
    } catch (error) {
      next(error);

      console.log(error);
    }
  }

  //
  //
  async onDeletePatient(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.deletePatient(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
