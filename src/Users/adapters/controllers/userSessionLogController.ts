/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { logger } from '../../utils/logger'
import {validate as isUUID} from 'uuid'
import { IUserSessionInteractor } from '../../application/interfaces/IUserSessionInteractor';
import { UserSessionLogInterface } from 'otz-types';
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class UserSessionLogController {
  private readonly interactor: IUserSessionInteractor;

  constructor(interactor: IUserSessionInteractor) {
    this.interactor = interactor;
  }

  async onCreateUserSessionLog(req: Request, res: Response, next: NextFunction) {

    try {
      // console.log(nextOfKinData)
      await this.interactor.createUserSession(req.body);
      res.status(200).json([]);
      logger.info({
        message: "Created New Patient  Log Successfully! ~" + req.body.firstName,
      });
      next();
    } catch (error) {
      console.log(error);
      logger.error(error);
      res.status(500).json({ message: "Internal Server Error" });
      next(error);
    }
  }

  async onGetAllUserSessionLogs(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllUserSessions();
      res.status(200).json(results);
      logger.info({ message: "Fetched all Patients Logs Successfully!" });

      next();
    } catch (error) {
      next(error);
      logger.error(error);
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }


  async onGetUserSessionLogById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id || id === "undefined")
        return res.status(400).json({ message: "Invalid ID parameter" });

      if (!isUUID(id)) {
        const errMessage = `${id} is not a valid UUID `;
        logger.error(errMessage);
        return res.status(404).json({ error: errMessage });
      }
      const result = await this.interactor.getUserSessionById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async onEditUserSessionLog(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id || id === "undefined")
        return res
          .status(400)
          .json({ message: "Invalid ID parameter" });

      const {
        firstName,
        middleName,
        lastName,
        phoneNo,
        role,
      }: UserSessionLogInterface = req.body;
      const values: UserSessionLogInterface = {
        id,
        firstName,
        middleName,
        lastName,
        phoneNo,
        role,
        //
        maritalStatus: "",
      };

      const results = await this.interactor.editUserSession(values);
      res.status(200).json(results);
    } catch (error) {
      console.log(error);
    }
  }

   //
  async onDeleteUserSessionLog(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.deleteUserSession(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
