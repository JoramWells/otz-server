/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IAppointmentAgendaInteractor } from "../../application/interfaces/appointment/IAppointmentAgendaInteractor";
import { IAppointmentStatusInteractor } from "../../application/interfaces/appointment/IAppointmentStatusInteractor";
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class AppointmentStatusController {
  private readonly interactor: IAppointmentStatusInteractor;

  constructor(interactor: IAppointmentStatusInteractor) {
    this.interactor = interactor;
  }

  async onCreateAppointmentStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const newProfile = await this.interactor.createAppointmentStatus(req.body);
      const io = req.app.locals.io
      io.emit('appointment-agenda-updated',JSON.stringify(newProfile))
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

  async onGetAllAppointmentStatus(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllAppointmentStatus();
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      // console.log(error)
    }
  }

  async onGetAppointmentStatusById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getAppointmentStatusById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
