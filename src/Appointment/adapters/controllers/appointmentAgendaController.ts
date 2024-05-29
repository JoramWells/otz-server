/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IAppointmentAgendaInteractor } from "../../application/interfaces/appointment/IAppointmentAgendaInteractor";
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class AppointmentAgendaController {
  private readonly interactor: IAppointmentAgendaInteractor;

  constructor(interactor: IAppointmentAgendaInteractor) {
    this.interactor = interactor;
  }

  async onCreateAppointmentAgenda(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const newProfile = await this.interactor.createAppointmentAgenda(req.body);
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

  async onGetAllAppointmentAgendas(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllAppointmentAgendas();
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      // console.log(error)
    }
  }

  async onGetAppointmentAgendaById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getAppointmentAgendaById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
