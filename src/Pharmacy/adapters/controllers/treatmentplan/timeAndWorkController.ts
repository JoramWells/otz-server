/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { ITimeAndWorkInteractor } from "../../../application/interfaces/treatmentplan/ITimeAndWorkInteractor";
import { logger } from "../../../utils/logger";
import { validate as isUUID } from "uuid";

// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class TimeAndWorkController {
  private readonly interactor: ITimeAndWorkInteractor;

  constructor(interactor: ITimeAndWorkInteractor) {
    this.interactor = interactor;
  }

  async onCreateTimeAndWork(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const newProfile = await this.interactor.createTimeAndWork(req.body);
      res.json(newProfile);
      //   logger.info({
      //     message: "Created New Patient Successfully! ~" + req.body.firstName,
      //   });
      next();
    } catch (error) {
      // console.log(error)

      next(error);
    }
  }

  async onGetAllTimeAndWork(req: Request, res: Response, next: NextFunction) {
    try {
      let { hospitalID, page, pageSize, searchQuery } = req.query;

      const results = await this.interactor.getAllTimeAndWork(
        hospitalID as string,
        page as string,
        pageSize as string,
        searchQuery as string
      );
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      // console.log(error)
    }
  }

  async onGetTimeAndWorkByPatientId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      if (!isUUID(id)) {
        const errMessage = `${id} is not a valid UUID `;
        logger.error(errMessage);
        return res.status(404).json({ error: errMessage });
      }
      if (!id || id === "undefined")
        return res.status(400).json({ message: "Invalid ID parameter" });
      const result = await this.interactor.getTimeAndWorkByPatientId(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async onGetTimeAndWorkById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id || id === "undefined")
        return res.status(400).json({ message: "Invalid ID parameter" });
      const result = await this.interactor.getTimeAndWorkById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  async onGetTimeAndWorkByVisitId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      if (!id || id === "undefined")
        return res.status(400).json({ message: "Invalid ID parameter" });
      const result = await this.interactor.getTimeAndWorkByVisitId(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateMorningSchedule(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      console.log(req.body);
      const result = await this.interactor.updateMorningSchedule(id, req.body);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async onEditSchedule(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.updateSchedule(id, req.body);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateEveningSchedule(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      console.log(req.body);

      const result = await this.interactor.updateEveningSchedule(id, req.body);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  async onDeleteSchedule(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.deleteTimeAndWork(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  async onGetTimeAndWorkRecent(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { hospitalID } = req.query;

      const result = await this.interactor.getTimeAndWorkByVisitId(hospitalID);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
