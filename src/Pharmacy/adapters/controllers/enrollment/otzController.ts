/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IOTZInteractor } from "../../../application/interfaces/enrollment/IOTZInteractor";
import { validate as isUUID } from "uuid";
import { logger } from "../../../utils/logger";

// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class OTZController {
  private readonly interactor: IOTZInteractor;

  constructor(interactor: IOTZInteractor) {
    this.interactor = interactor;
  }

  async onCreateOTZ(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const newProfile = await this.interactor.createOTZ(req.body);
      res.json(newProfile);
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async onGetAllOTZs(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()
      let { hospitalID, page, pageSize, searchQuery } = req.query;

      if (!hospitalID || hospitalID === "undefined")
        return res.status(400).json({ message: "Invalid ID parameter" });

      if (!Number.isInteger(page) && !Number.isInteger(pageSize)) {
        page = parseInt(page, 10);
        pageSize = Number(pageSize);
      }
      if (!isUUID(hospitalID)) {
        const errMessage = `${hospitalID} is not a valid UUID `;
        logger.error(errMessage);
        return res.status(404).json({ error: errMessage });
      }

      const results = await this.interactor.getAllOTZs(
        hospitalID as string,
        page as unknown as number,
        pageSize as unknown as number,
        searchQuery as string
      );
      res.status(200).json(results);
      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }

  async onGetOTZById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getOTZById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  async onDeleteOTZ(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.deleteOTZ(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
