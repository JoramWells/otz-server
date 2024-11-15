/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IFacilityMAPCSVInteractor } from "../../../application/interfaces/etl/IFacilityMAPSInteractor";
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class FacilityMAPController {
  private readonly interactor: IFacilityMAPCSVInteractor;

  constructor(interactor: IFacilityMAPCSVInteractor) {
    this.interactor = interactor;
  }

  async onCreateFacilityMAPCSV(req: Request, res: Response, next: NextFunction) {
    const file = req.file;

    const isVideo = file?.mimetype.startsWith("video");

    const mediaData = isVideo
      ? { video: file?.filename }
      : { image: file?.filename };
    const image = mediaData.image ? mediaData.image : "";
    const video = mediaData.video ? mediaData.video : "";
    const data = { ...req.body, image, video };

    try {
      const newProfile = await this.interactor.createFacilityMAP(data);
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

  async onGetAllFacilityMAPCSVs(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()
      const { hospitalID } = req.params;
      if (!hospitalID || hospitalID === "undefined")
        return res.status(400).json({ message: "Invalid ID parameter" });

      const results = await this.interactor.getAllFacilityMAPs(hospitalID);
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }

  
  //
  async onGetFacilityMAPCSVByIds(req: Request, res: Response, next: NextFunction) {
    const {id} = req.params
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getFacilityMAPById(id);
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }
}
