/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IUserNotificationInteractor } from "../../../application/interfaces/notify/IUserNotificationInteractor";
// import { createClient } from 'redis'
// import { User } from '../../domain/entities/User'
export class UserNotificationController {
  private readonly interactor: IUserNotificationInteractor;

  constructor(interactor: IUserNotificationInteractor) {
    this.interactor = interactor;
  }

  async onCreateUserNotification(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const newProfile = await this.interactor.createUserNotification(req.body);
      res.json(newProfile);
      //   logger.info({
      //     message: "Created New User Successfully! ~" + req.body.firstName,
      //   });
      next();
    } catch (error) {
      // console.log(error)

      next(error);
    }
  }

  async onGetAllUserNotification(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllUserNotifications();
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error)
    }
  }

  async onGetUserNotificationById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getUserNotificationById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
