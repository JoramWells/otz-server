/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IRequestInteractor } from "../../../application/interfaces/chats/IRequestInteractor";
// import { createClient } from 'redis'
// import { Chat } from '../../domain/entities/Chat'
export class RequestsController {
  private readonly interactor: IRequestInteractor;

  constructor(interactor: IRequestInteractor) {
    this.interactor = interactor;
  }

  async onCreateRequest(req: Request, res: Response, next: NextFunction) {
    try {
      const {id1, id2} = req.body
      const newProfile = await this.interactor.createRequests(req.body);
      
      
      console.log(req.body)
      res.json(newProfile);
    //   logger.info({
    //     Request: "Created New Request Successfully! ~" + req.body.firstName,
    //   });
      next();
    } catch (error) {
      console.log(error)

      next(error);
    }
  }

  async onGetAllRequests(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllRequests();
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      // console.log(error)
    }
  }

  async onGetRequestById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if(id === 'undefined' ) return;
      const result = await this.interactor.getRequestsById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ Request: "Internal Server Error" });
    }
  }
}
