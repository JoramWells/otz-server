/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { INotificationInteractor } from "../../../application/interfaces/notify/INotificationInteractor";
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class NotificationController {
  private readonly interactor: INotificationInteractor;

  constructor(interactor: INotificationInteractor) {
    this.interactor = interactor;
  }

  async onCreateNotification(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const newProfile = await this.interactor.createNotification(req.body);
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

  async onGetAllNotification(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllNotifications();
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      // console.log(error)
    }
  }

  async onGetNotificationById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getNotificationById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
