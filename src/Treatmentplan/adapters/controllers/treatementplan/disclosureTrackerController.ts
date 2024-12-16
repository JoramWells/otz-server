/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IDisclosureTrackerInteractor } from "../../../application/interfaces/disclosure/IDisclosureTrackerInteractor";

export class DisclosureTrackerController {
  private readonly interactor: IDisclosureTrackerInteractor;

  constructor(interactor: IDisclosureTrackerInteractor) {
    this.interactor = interactor;
  }

  async onCreateDisclosureTracker(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const newProfile = await this.interactor.createDisclosureTracker(
        req.body
      );
      res.json(newProfile);
      //   logger.info({
      //     message: "Created New Patient Successfully! ~" + req.body.firstName,
      //   });
      next();
    } catch (error) {
      // console.log(error)

      next(error);
    }
  }

  async onGetAllDisclosureTracker(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()
      const {
        hospitalID,
        page,
        pageSize,
        searchQuery,
        hasFullDisclosure,
        hasPartialDisclosure,
      } = req.query;

      const results = await this.interactor.getAllDisclosureTracker(
        hospitalID as string,
        page as string,
        pageSize,
        searchQuery,
        hasFullDisclosure,
        hasPartialDisclosure
      );
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      // console.log(error)
    }
  }

  async onGetDisclosureTrackerById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getDisclosureTrackerById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  async onGroupByPartialStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { hospitalID } = req.query;
      const result = await this.interactor.groupUsersByPartialStatus(hospitalID);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  async onGroupByFullStatus(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { hospitalID } = req.query;
      const result = await this.interactor.groupUsersByFullStatus(hospitalID);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
