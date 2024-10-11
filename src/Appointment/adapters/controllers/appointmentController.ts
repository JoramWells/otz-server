/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IAppointmentInteractor } from "../../application/interfaces/appointment/IAppointementInteractor";
import { logger } from "../../utils/logger";
import { validate as isUUID } from "uuid";
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
      const { mode } = req.query;

      const results = await this.interactor.getAllAppointments(mode as string);
      res.status(200).json(results);
      res.flush();

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
      if (id === "undefined") {
        res
          .status(500)
          .json({ message: "Please provide a valid appointment id." });
      }
      if (!isUUID(id)) {
        const errMessage = `${id} is not a valid UUID `;
        logger.error(errMessage);
        return res.status(404).json({ error: errMessage });
      }
      const result = await this.interactor.getAppointmentById(id);
      res.status(200).json(result);

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
     if (!id || id === "undefined")
       return res.status(400).json({ message: "Invalid ID parameter" });
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

  //
  async onFindRecentAppointmentByPatientID(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { id } = req.params;
       if (!id || id === "undefined")
         return res.status(400).json({ message: "Invalid ID parameter" });

    const { agenda } = req.query;
    try {
      const result = await this.interactor.getRecentAppointmentByPatientID(
        id,
        agenda as string
      );
      if (!isUUID(id)) {
        const errMessage = `${id} is not a valid UUID `;
        logger.error(errMessage);
        return res.status(404).json({ error: errMessage });
      }
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
            if (!id || id === "undefined")
              return res.status(400).json({ message: "Invalid ID parameter" });
      if (!isUUID(id)) {
        const errMessage = `${id} is not a valid UUID `;
        logger.error(errMessage);
        return res.status(404).json({ error: errMessage });
      }
      const patient = await this.interactor.getAppointmentDetail(id);
      res.status(200).json(patient);
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
      next(error);
    }
  }

  // use patient ID
  async onStar(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    const { id } = req.params;
    const { isStarred, patientID } = req.body;
    try {
       if (!id || id === "undefined")
         return res.status(400).json({ message: "Invalid ID parameter" });
      if (!isUUID(id)) {
        const errMessage = `${id} is not a valid UUID `;
        logger.error(errMessage);
        return res.status(404).json({ error: errMessage });
      }
      const patient = await this.interactor.starAppointment(
        id,
        patientID,
        isStarred
      );
      res.status(200).json(patient);
      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
      next(error);
    }
  }

  async onMarkAsRead(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!isUUID(id)) {
        const errMessage = `${id} is not a valid UUID `;
        logger.error(errMessage);
        return res.status(404).json({ error: errMessage });
      }
      const results = await this.interactor.markAsRead(id);
      res.status(200).json(results);
    } catch (error) {
      console.log(error);
    }
  }

  //
  async onReschedule(req: Request, res: Response) {
    const { id } = req.params;

    try {
      if (!isUUID(id)) {
        const errMessage = `${id} is not a valid UUID `;
        logger.error(errMessage);
        return res.status(404).json({ error: errMessage });
      }
      const { reason, rescheduledDate } = req.body;
      const results = await this.interactor.rescheduleAppointment(
        id,
        reason,
        rescheduledDate
      );
      res.status(200).json(results);
    } catch (error) {
      console.log(error);
    }
  }
}
