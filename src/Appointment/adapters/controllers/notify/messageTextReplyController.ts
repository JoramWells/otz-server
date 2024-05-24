/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IMessageTextReplyInteractor } from "../../../application/interfaces/notify/IMessageTextReplyInteractor";
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class MessageTextReplyController {
  private readonly interactor: IMessageTextReplyInteractor;

  constructor(interactor: IMessageTextReplyInteractor) {
    this.interactor = interactor;
  }

  async onCreateMessageTextReply(req: Request, res: Response, next: NextFunction) {
    const data = { ...req.body, image: req.file?.filename };

    try {
      console.log(req.body);
      const newProfile = await this.interactor.createMessageTextReply(data);
      res.sendStatus(200).json(newProfile);
      //   logger.info({
      //     message: "Created New Patient Successfully! ~" + req.body.firstName,
      //   });
      next();
    } catch (error) {
      console.log(error)

      next(error);
    }
  }

  async onGetAllMessageTextReplies(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllMessageTextReplies();
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      // console.log(error)
    }
  }

  async onGetMessageTextReplyById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getMessageTextReplyById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
