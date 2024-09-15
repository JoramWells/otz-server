/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IHomeVisitConfigInteractor } from "../../../application/interfaces/homevisit/IHomeVisitConfigInteractor";
import { AppointmentAttributes, HomeVisitConfigAttributes } from "otz-types";

export class HomeVisitConfigController {
  private readonly interactor: IHomeVisitConfigInteractor;

  constructor(interactor: IHomeVisitConfigInteractor) {
    this.interactor = interactor;
  }

  async onCreateAHomeVisitConfig(req: Request, res: Response, next: NextFunction) {
    try {





      const newProfile = await this.interactor.createHomeVisitConfig(
        req.body
      );
      res.json(newProfile);
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async onGetAllHomeVisitConfig(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllHomeVisitConfig();
      res.status(200).json(results);
      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }

  async onGetAHomeVisitConfigById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getHomeVisitConfigById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }


}
