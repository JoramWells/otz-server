/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IArticleProgressInteractor } from "../../../../application/interfaces/articles/progress/IArticleProgressInteractor";
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class ArticleProgressController {
  private readonly interactor: IArticleProgressInteractor;

  constructor(interactor: IArticleProgressInteractor) {
    this.interactor = interactor;
  }

  async onCreateArticleProgress(req: Request, res: Response, next: NextFunction) {
    try {
 
      const newProfile = await this.interactor.createArticleProgress(req.body);
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

  async onGetAllArticleProgress(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllArticleProgress();
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      // console.log(error)
    }
  }

  async onGetArticleProgressById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getArticleProgressById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  // async onGetAllBooksById(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const { id } = req.params;
  //     const result = await this.interactor.getAllArticleProgress(id);
  //     res.status(200).json(result);
  //     next();
  //   } catch (error) {
  //     next(error);
  //     console.log(error);
  //     res.status(500).json({ message: "Internal Server Error" });
  //   }
  // }
}
