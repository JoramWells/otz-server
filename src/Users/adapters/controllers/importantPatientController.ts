/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { logger } from '../../utils/logger'
import {validate as isUUID} from 'uuid'
import { ImportantPatientInteractor } from '../../application/interactors/importantPatientInteractor';
import { ImportantPatientsInterface } from 'otz-types';
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class ImportantPatientController {
  private readonly interactor: ImportantPatientInteractor;

  constructor(interactor: ImportantPatientInteractor) {
    this.interactor = interactor;
  }

  async onCreateImportantPatient(req: Request, res: Response, next: NextFunction) {

    try {
      // console.log(nextOfKinData)
      await this.interactor.createImportantPatient(req.body);
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

  async onGetAllImportantPatients(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllImportantPatients();
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


  async onGetImportantPatientById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id || id === "undefined")
        return res.status(400).json({ message: "Invalid ID parameter" });

      if (!isUUID(id)) {
        const errMessage = `${id} is not a valid UUID `;
        logger.error(errMessage);
        return res.status(404).json({ error: errMessage });
      }
      const result = await this.interactor.getImportantPatientById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

    async onGetImportantPatientByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id || id === "undefined")
        return res.status(400).json({ message: "Invalid ID parameter" });

      if (!isUUID(id)) {
        const errMessage = `${id} is not a valid UUID `;
        logger.error(errMessage);
        return res.status(404).json({ error: errMessage });
      }
      const result = await this.interactor.getImportantPatientByUserId(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async onEditImportantPatient(req: Request, res: Response, next: NextFunction) {
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
      }: ImportantPatientsInterface = req.body;
      const values: ImportantPatientsInterface = {
        id,
        firstName,
        middleName,
        lastName,
        phoneNo,
        role,
        //
        maritalStatus: "",
      };

      const results = await this.interactor.editImportantPatient(values);
      res.status(200).json(results);
    } catch (error) {
      console.log(error);
    }
  }

   //
  async onDeleteImportantPatient(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.deleteImportantPatient(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
