/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { IVitalSignsInteractor } from '../../../application/interfaces/lab/IVitalSignsInteractor'
import { validate as isUUID } from "uuid";
import { logger } from '../../../utils/logger';

// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class VitalSignsController {
  private readonly interactor: IVitalSignsInteractor;

  constructor(interactor: IVitalSignsInteractor) {
    this.interactor = interactor;
  }

  async onCreateVitalSign(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const newProfile = await this.interactor.createVitalSigns(req.body);
      res.json(newProfile);
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async onGetAllVitalSigns(req: Request, res: Response, next: NextFunction) {
    try {
      let {
        hospitalID,
        page,
        pageSize,
        searchQuery,

      } = req.query;

      if (!hospitalID || hospitalID === "undefined")
        return res.status(400).json({ message: "Invalid ID parameter" });

      if (!isUUID(hospitalID)) {
        const errMessage = `${hospitalID} is not a valid UUID `;
        logger.error(errMessage);
        return res.status(404).json({ error: errMessage });
      }

      //
      if (!Number.isInteger(page) && !Number.isInteger(pageSize)) {
        page = Number(page);
        pageSize = Number(pageSize);
      }
      if (page <= 0) {
        page = 1;
      }

      const results = await this.interactor.getAllVitalSigns(hospitalID, page, pageSize, searchQuery);
      res.status(200).json(results);
      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }

  async onGetVitalSignById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getVitalSignsById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  async onGetVitalSignPatientId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getVitalSignsByPatientId(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  async onGetVitalSignByVisitId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getVitalSignsByVisitId(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
