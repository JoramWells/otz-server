/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IMessageInteractor } from "../../../application/interfaces/chats/IMessageInteractor";
// import { createClient } from 'redis'
// import { Chat } from '../../domain/entities/Chat'
export class MessagesController {
  private readonly interactor: IMessageInteractor;

  constructor(interactor: IMessageInteractor) {
    this.interactor = interactor;
  }

  async onCreateMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const {id1, id2} = req.body
      const newProfile = await this.interactor.createMessages(req.body);
      
      
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

  async onGetAllMessages(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllMessages();
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      // console.log(error)
    }
  }

  async onGetMessageById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if(id === 'undefined' ) return;
      const result = await this.interactor.getMessagesById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
