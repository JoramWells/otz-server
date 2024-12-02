/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { type IPatientVisitInteractor } from "../../application/interfaces/IPatientVisitInteractor";
import { logger } from "../../utils/logger";
import { validate as isUUID } from "uuid";

// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class PatientVisitController {
  private readonly interactor: IPatientVisitInteractor;

  constructor(interactor: IPatientVisitInteractor) {
    this.interactor = interactor;
  }

  async onCreatePatientVisit(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const newProfile = await this.interactor.createPatientVisit(req.body);
      res.json(newProfile);
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async onGetAllPatientVisits(req: Request, res: Response, next: NextFunction) {
    try {
      let { hospitalID, page, pageSize, searchQuery } = req.query;

      if (!hospitalID || hospitalID === "undefined")
        return res.status(400).json({ message: "Invalid ID parameter" });

      if (!isUUID(hospitalID)) {
        const errMessage = `${hospitalID} is not a valid UUID `;
        logger.error(errMessage);
        return res.status(404).json({ error: errMessage });
      }

      if (!Number.isInteger(page) && !Number.isInteger(pageSize)) {
        page = Number(page);
        pageSize = Number(pageSize);
      }

      //
      if (page <= 0) {
        page = 1;
      }

      const results = await this.interactor.getAllPatientVisits(
        hospitalID,
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

  async onGetPatientVisitById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getPatientVisitById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  async onGetAllPatientHistoryVisitById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      let {
        page,
        pageSize,
        searchQuery,
      } = req.query;

      //
        if (!Number.isInteger(page) && !Number.isInteger(pageSize)) {
          page = Number(page);
          pageSize = Number(pageSize);
        }

        //
        if (page <= 0) {
          page = 1;
        }

        if (!Number.isInteger(page) && !Number.isInteger(pageSize)) {
          page = Number(page);
          pageSize = Number(pageSize);
        }

        //
        if (page <= 0) {
          page = 1;
        }

        // 
      const result = await this.interactor.getHistoryPatientVisitById(id, page, pageSize, searchQuery);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  async onGetAllPatientVisitByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getPatientVisitByUserId(id);
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
  async onGetAllUserPatientCount(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getUserPatientCount(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  async onGetAllUserActivitiesCount(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getUserActivitiesCount(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
