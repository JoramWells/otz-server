/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IAppointmentMessageInteractor } from "../../application/interfaces/appointment/IAppointmentMessageInteractor";
// import { createClient } from 'redis'
// import { Chat } from '../../domain/entities/Chat'
export class AppointmentMessageController {
  private readonly interactor: IAppointmentMessageInteractor;

  constructor(interactor: IAppointmentMessageInteractor) {
    this.interactor = interactor;
  }

  async onCreateAppointmentMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const {id1, id2} = req.body
      const newProfile = await this.interactor.createAppointmentMessages(req.body);
      
      
      console.log(req.body)
      res.json(newProfile);
    //   logger.info({
    //     message: "Created New Message Successfully! ~" + req.body.firstName,
    //   });
      next();
    } catch (error) {
      console.log(error)

      next(error);
    }
  }

  async onGetAllAppointmentMessages(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllAppointmentMessages();
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      // console.log(error)
    }
  }

  async onGetAppointmentMessageById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if(id === 'undefined' ) return;
      const result = await this.interactor.getAppointmentMessagesById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
