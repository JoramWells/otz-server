/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { logger } from '../../utils/logger'
import {  PatientAttributes } from 'otz-types';
import {validate as isUUID} from 'uuid'
import { IPatientSessionInteractor } from '../../application/interfaces/IPatientSessionInteractor';
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class PatientSessionLogController {
  private readonly interactor: IPatientSessionInteractor;

  constructor(interactor: IPatientSessionInteractor) {
    this.interactor = interactor;
  }

  async onCreatePatientSessionLog(req: Request, res: Response, next: NextFunction) {

    try {
      // console.log(nextOfKinData)
      await this.interactor.createPatientSession(req.body);
      res.status(200).json([]);
      logger.info({
        message: "Created New Patient  Log Successfully! ~" + req.body.firstName,
      });
      next();
    } catch (error) {
      console.log(error);
      logger.error(error);
      res.status(500).json({ message: "Internal Server Error" });
      next(error);
    }
  }

  async onGetAllPatientSessionLogs(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllPatientSessions();
      res.status(200).json(results);
      logger.info({ message: "Fetched all Patients Logs Successfully!" });

      next();
    } catch (error) {
      next(error);
      logger.error(error);
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }


  async onGetPatientSessionLogById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id || id === "undefined")
        return res.status(400).json({ message: "Invalid ID parameter" });

      if (!isUUID(id)) {
        const errMessage = `${id} is not a valid UUID `;
        logger.error(errMessage);
        return res.status(404).json({ error: errMessage });
      }
      const result = await this.interactor.getPatientSessionById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async onEditPatientSessionLog(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id || id === "undefined")
        return res
          .status(400)
          .json({ message: "Invalid ID parameter" });

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

      const results = await this.interactor.editPatientSession(values);
      res.status(200).json(results);
    } catch (error) {
      console.log(error);
    }
  }

   //
  async onDeletePatient(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.deletePatientSession(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
