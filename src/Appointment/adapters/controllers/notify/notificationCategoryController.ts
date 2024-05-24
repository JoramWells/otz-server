/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { INotificationCategoryInteractor } from "../../../application/interfaces/notify/INotificationCategoryInteractor";
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class NotificationCategoryController {
  private readonly interactor: INotificationCategoryInteractor;

  constructor(interactor: INotificationCategoryInteractor) {
    this.interactor = interactor;
  }

  async onCreateNotificationCategory(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const newProfile = await this.interactor.createNotificationCategory(req.body);
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

  async onGetAllNotificationCategory(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllNotificationCategories();
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      // console.log(error)
    }
  }

  async onGetNotificationCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getNotificationCategoryById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
