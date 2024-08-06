/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { type IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { logger } from '../../utils/logger'
import { NextOfKinInterface, PatientAttributes } from 'otz-types';
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class PatientController {
  private readonly interactor: IPatientInteractor;

  constructor(interactor: IPatientInteractor) {
    this.interactor = interactor;
  }

  async onCreatePatient(req: Request, res: Response, next: NextFunction) {
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
      role
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
      if(id === 'undefined') return null;
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
      if(id==='undefined') return null;
      const { firstName, middleName, lastName, phoneNo, role }: PatientAttributes =
        req.body;
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
}
