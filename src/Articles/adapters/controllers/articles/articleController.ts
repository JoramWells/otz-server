/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IArticleInteractor } from "../../../application/interfaces/articles/IArticleInteractor";
import { ArticleAttributes } from "otz-types";
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class ArticleController {
  private readonly interactor: IArticleInteractor;

  constructor(interactor: IArticleInteractor) {
    this.interactor = interactor;
  }

  async onCreateArticle(req: Request, res: Response, next: NextFunction) {
    const file = req.file

    const isVideo = file?.mimetype.startsWith('video')

    const mediaData = isVideo ? {video:file?.filename}:{  image: file?.filename} 
    const image = mediaData.image ? mediaData.image :''
    const video = mediaData.video ? mediaData.video : "";
    const data = { ...req.body, image, video };

    try {
      const newProfile = await this.interactor.createArticle(data);
      res.status(200).json(newProfile);
      //   logger.info({
      //     message: "Created New Patient Successfully! ~" + req.body.firstName,
      //   });
      next();
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  async onGetAllArticles(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllArticles();
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }

  async onGetArticleById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getArticleById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async onGetAllArticleChaptersById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getAllArticleChaptersById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async onDeleteArticleById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.deleteArticleById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  async onEditArticle(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { content,image,title, userID,chapterID, video, viewers }: ArticleAttributes =
        req.body;
      const values: ArticleAttributes = {
        id,
        content,
        image,
        title,
        userID,
        chapterID,
        video,
        viewers
        //
      };

      const results = await this.interactor.editArticle(values);
      res.status(200).json(results);
    } catch (error) {
      console.log(error);
    }
  }
}
