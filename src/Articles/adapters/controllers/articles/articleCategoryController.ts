/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IArticleCategoryInteractor } from "../../../application/interfaces/articles/IArticleCategoryInteractor";
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class ArticleCategoryController {
  private readonly interactor: IArticleCategoryInteractor;

  constructor(interactor: IArticleCategoryInteractor) {
    this.interactor = interactor;
  }

  async onCreateArticleCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = { ...req.body, thumbnail: req.file?.filename };
      console.log(data);
      const newProfile = await this.interactor.createArticleCategory(data);
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

  async onGetAllArticleCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllArticleCategories();
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      // console.log(error)
    }
  }

  async onGetArticleCategoryById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getArticleCategoryById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async onDeleteBook(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.deleteBook(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
