/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IChapterInteractor } from "../../../application/interfaces/articles/IChapterInteractor";
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class ChapterController {
  private readonly interactor: IChapterInteractor;

  constructor(interactor: IChapterInteractor) {
    this.interactor = interactor;
  }

  async onCreateChapter(req: Request, res: Response, next: NextFunction) {
    try {
      const data = {...req.body, thumbnail: req.file?.filename}
      console.log(data)
      const newProfile = await this.interactor.createChapter(data);
      res.json(newProfile);
      //   logger.info({
      //     message: "Created New Patient Successfully! ~" + req.body.firstName,
      //   });
      next();
    } catch (error) {
      console.log(error)

      next(error);
    }
  }

  async onGetAllChapter(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllChapters();
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      // console.log(error)
    }
  }

  async onGetChapterById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getChapterById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
