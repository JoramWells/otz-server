/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { type IARTPrescriptionInteractor } from '../../application/interfaces/art/IARTPrescriptionInteractor'
import { validate as isUUID } from "uuid";
import { logger } from '../../utils/logger';

// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class ARTPrescriptionController {
  private readonly interactor: IARTPrescriptionInteractor;

  constructor(interactor: IARTPrescriptionInteractor) {
    this.interactor = interactor;
  }

  async onCreateARTPrescription(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log(req.body);
      const newProfile = await this.interactor.createARTPrescription(req.body);
      res.json(newProfile);
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async onGetAllARTPrescriptions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { hospitalID } = req.query;
      console.log(hospitalID, "hospitalID");

      if (!hospitalID || hospitalID === "undefined")
        return res.status(400).json({ message: "Invalid ID parameter" });

      if (!isUUID(hospitalID)) {
        const errMessage = `${hospitalID} is not a valid UUID `;
        logger.error(errMessage);
        return res.status(404).json({ error: errMessage });
      }

      const results = await this.interactor.getAllARTPrescriptions(
        hospitalID as string
      );
      res.status(200).json(results);
      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }

  async onGetARTPrescriptionById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getARTPrescriptionById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  //
  async onGetPrescriptionByName(req: Request, res: Response, next: NextFunction) {
    const { hospitalID } = req.query;
    if (hospitalID === "undefined") return null;

    try {
      const result = await this.interactor.getPrescriptionByCategory(hospitalID);
      if (!isUUID(hospitalID)) {
        const errMessage = `${hospitalID} is not a valid UUID `;
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
}
