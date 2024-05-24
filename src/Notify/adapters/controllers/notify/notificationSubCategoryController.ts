/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { INotificationSubCategoryInteractor } from "../../../application/interfaces/notify/INotificationSubCategoryInteractor";
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class NotificationSubCategoryController {
  private readonly interactor: INotificationSubCategoryInteractor;

  constructor(interactor: INotificationSubCategoryInteractor) {
    this.interactor = interactor;
  }

  async onCreateNotificationSubCategory(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const newProfile = await this.interactor.createNotificationSubCategory(req.body);
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

  async onGetAllNotificationSubCategory(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllNotificationSubCategories();
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      // console.log(error)
    }
  }

  async onGetNotificationSubCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getNotificationSubCategoryById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
