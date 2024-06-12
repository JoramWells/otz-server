/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IQuestionInteractor } from "../../../application/interfaces/articles/IQuestionInteractor";
// import { createClient } from 'redis'
export class QuestionController {
  private readonly interactor: IQuestionInteractor;

  constructor(interactor: IQuestionInteractor) {
    this.interactor = interactor;
  }

  async onCreateQuestion(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body
      console.log(data)
      const newProfile = await this.interactor.createQuestion(data);
      res.json(newProfile);
      //   logger.info({
      //     message: "Created New Patient Successfully! ~" + req.body.firstName,
      //   });
      next();
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  async onGetAllQuestion(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllQuestions();
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      // console.log(error)
    }
  }

  async onGetQuestionById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getQuestionById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }


}
