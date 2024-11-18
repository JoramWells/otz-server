/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IPhoneNumberVerificationInteractor } from "../../../application/interfaces/contacts/IPhoneNumberVerificationInteractor";
// import { createClient } from 'redis'
// import { Chat } from '../../domain/entities/Chat'
export class PhoneNumberVerificationController {
  private readonly interactor: IPhoneNumberVerificationInteractor;

  constructor(interactor: IPhoneNumberVerificationInteractor) {
    this.interactor = interactor;
  }

  async onCreatePhoneNumberVerifications(req: Request, res: Response, next: NextFunction) {
    try {
      const newProfile = await this.interactor.createPhoneNumberVerification(req.body);

      res.json(newProfile);
      //   logger.info({
      //     message: "Created New Message Successfully! ~" + req.body.firstName,
      //   });
      next();
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  async onGetAllPhoneNumberVerifications(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllPhoneNumberVerifications();
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      // console.log(error)
    }
  }

  async onGetPhoneNumberVerificationsById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id || id === "undefined")
        return res.status(400).json({ message: "Invalid ID parameter" });
      const result = await this.interactor.getPhoneNumberVerificationById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
