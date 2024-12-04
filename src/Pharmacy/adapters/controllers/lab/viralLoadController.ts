/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { validate as isUUID } from "uuid";
import { logger } from "../../../utils/logger";
import { IViralLoadInteractor } from "../../../application/interfaces/lab/IViralLoadInteractor";

// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class ViralLoadController {
  private readonly interactor: IViralLoadInteractor;

  constructor(interactor: IViralLoadInteractor) {
    this.interactor = interactor;
  }

  async onCreateViralLoad(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const newProfile = await this.interactor.createViralLoad(req.body);
      res.json(newProfile);
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async onGetAllViralLoads(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()
      let { hospitalID, page, pageSize, searchQuery } = req.query;
      console.log(hospitalID, "hospitalID");

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

      const results = await this.interactor.getAllViralLoads(
        hospitalID as string,
        page,
        pageSize,
        searchQuery
      );
      res.status(200).json(results);
      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }

  async onGetViralLoadById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getViralLoadById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  async onGetSuppressionRate(req: Request, res: Response, next: NextFunction) {
    try {
      const { hospitalID, startDate, endEndDate } = req.query;
      if (!hospitalID || hospitalID === "undefined")
        return res.status(400).json({ message: "Invalid ID parameter" });

      if (!isUUID(hospitalID)) {
        const errMessage = `${hospitalID} is not a valid UUID `;
        logger.error(errMessage);
        return res.status(404).json({ error: errMessage });
      }
      const result = await this.interactor.getSuppressionRate(
        hospitalID,
        startDate,
        endEndDate
      );
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  async onGetByPatientId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getAllViralLoadByPatientID(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  async onGetCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const { hospitalID } = req.query;
      if (!hospitalID || hospitalID === "undefined")
        return res.status(400).json({ message: "Invalid ID parameter" });

      if (!isUUID(hospitalID)) {
        const errMessage = `${hospitalID} is not a valid UUID `;
        logger.error(errMessage);
        return res.status(404).json({ error: errMessage });
      }
      const result = await this.interactor.getAllVlCategories(
        hospitalID as string
      );
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
