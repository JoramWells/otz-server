/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { ILineListCSVInteractor } from "../../../application/interfaces/articles/ILineListInteractor";
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class LineListController {
  private readonly interactor: ILineListCSVInteractor;

  constructor(interactor: ILineListCSVInteractor) {
    this.interactor = interactor;
  }

  async onCreateLineListCSV(req: Request, res: Response, next: NextFunction) {
    const file = req.file;

    const isVideo = file?.mimetype.startsWith("video");

    const mediaData = isVideo
      ? { video: file?.filename }
      : { image: file?.filename };
    const image = mediaData.image ? mediaData.image : "";
    const video = mediaData.video ? mediaData.video : "";
    const data = { ...req.body, image, video };

    try {
      const newProfile = await this.interactor.createLineList(data);
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

  async onGetAllLineListCSVs(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllLineLists();
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }

  
  //
  async onGetLineListCSVByIds(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getLineListById(id);
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }
}
