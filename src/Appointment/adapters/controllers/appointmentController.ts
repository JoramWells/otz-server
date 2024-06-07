/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IAppointmentInteractor } from "../../application/interfaces/appointment/IAppointementInteractor";
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class AppointmentController {
  private readonly interactor: IAppointmentInteractor;

  constructor(interactor: IAppointmentInteractor) {
    this.interactor = interactor;
  }

  async onCreateAppointment(req: Request, res: Response, next: NextFunction) {
    try {
      const newProfile = await this.interactor.createAppointment(req.body);
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

  async onGetAllAppointments(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllAppointments();
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      console.log(error);

      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async onGetAppointmentById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if(id){
      const result = await this.interactor.getAppointmentById(id);
      res.status(200).json(result);

      }
      res.status(500).json({message:'Please provide a valid appointment id.'})
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async onGetPriorityAppointmentById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getPriorityAppointmentDetail(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  async onGetAllPriorityAppointments(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.interactor.getAllPriorityAppointments();
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  // use patient ID
  async getAppointmentDetail(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const patient = await this.interactor.getAppointmentDetail(id);
      res.status(200).json(patient);
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
      next(error);
    }
  }
}
