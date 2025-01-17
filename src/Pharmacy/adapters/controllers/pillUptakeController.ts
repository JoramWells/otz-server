/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { type IPillUptakeInteractor } from '../../application/interfaces/art/IPillUptakeInteractor'
import { validate as isUUID } from "uuid";

// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class PillUptakeController {
  private readonly interactor: IPillUptakeInteractor;

  constructor(interactor: IPillUptakeInteractor) {
    this.interactor = interactor;
  }

  async onCreatePillUptake(req: Request, res: Response, next: NextFunction) {
    try {
      const newProfile = await this.interactor.createPillUptake(req.body);
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

  async onGetAllPillUptake(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()
      const {date, hospitalID} = req.query
      if (!hospitalID || hospitalID === "undefined")
        return res.status(400).json({ message: "Invalid ID parameter" });

      if (!isUUID(hospitalID)) {
        const errMessage = `${hospitalID} is not a valid UUID `;
        logger.error(errMessage);
        return res.status(404).json({ error: errMessage });
      }
      const results = await this.interactor.getAllPillUptakes(date as unknown as Date, hospitalID as string);
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      // console.log(error)
    }
  }

  async onGetPillUptakeById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
            if (!id || id === "undefined")
              return res.status(400).json({ message: "Invalid ID parameter" });

      const result = await this.interactor.getPillUptakeById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async onGetCurrentPillUptake(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
           if (!id || id === "undefined")
             return res.status(400).json({ message: "Invalid ID parameter" });

      const result = await this.interactor.getCurrentPillUptake(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async onGetPillUptakeByPatientID(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
    try {
      if (!id || id === "undefined") return res.status(400).json({message:'Invalid ID parameter'});
      const results = await this.interactor.getPillUptakeByPatientID(id);
      res.status(200).json(results);
    } catch (error) {
      console.log(error);
    }
  }

  //
  async onEditPillUptake(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const timeQuery = req.query.time;
      if (timeQuery === "morning") {
        const { morningStatus } = req.body;
        const result = await this.interactor.editPillUptake(
          id,
          morningStatus,
          timeQuery
        );
        res.status(200).json(result);
        next();
      } else {
        const { eveningStatus } = req.body;
        const result = await this.interactor.editPillUptake(
          id,
          eveningStatus,
          timeQuery as string
        );
        res.status(200).json(result);
        next();
      }
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getDailyPillUptakeCount(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.interactor.getDailyPillUptakeCount();
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
  async onDeleteUptake(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.deleteUptake(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
