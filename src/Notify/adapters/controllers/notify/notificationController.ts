/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { INotificationInteractor } from "../../../application/interfaces/notify/INotificationInteractor";
// import { validate as isUUID } from "uuid";

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
      let { hospitalID, page, pageSize, searchQuery } = req.query;

      if (!hospitalID || hospitalID === "undefined")
        return res.status(400).json({ message: "Invalid ID parameter" });

      // if (!isUUID(hospitalID)) {
      //   const errMessage = `${hospitalID} is not a valid UUID `;
      //   logger.error(errMessage);
      //   return res.status(404).json({ error: errMessage });
      // }

      if (!Number.isInteger(page) && !Number.isInteger(pageSize)) {
        page = Number(page);
        pageSize = Number(pageSize);
      }

      //
      if (page <= 0) {
        page = 1;
      }

      const results = await this.interactor.getAllNotifications(
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
