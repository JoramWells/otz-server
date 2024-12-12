/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IChildCaregiverReadinessInteractor } from "../../../../application/interfaces/disclosure/partial/IChildCaregiverReadinessInteractor";

export class ChildCaregiverReadinessController {
  private readonly interactor: IChildCaregiverReadinessInteractor;

  constructor(interactor: IChildCaregiverReadinessInteractor) {
    this.interactor = interactor;
  }

  async onCreateChildCaregiverReadiness(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log(req.body);
      const newProfile = await this.interactor.createChildCaregiverReadiness(
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

  async onGetAllChildCaregiverReadiness(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllChildCaregiverReadiness();
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      // console.log(error)
    }
  }

  async onGetChildCaregiverReadinessById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getChildCaregiverReadinessById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  async onGetChildCaregiverReadinessByPatientId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const result =
        await this.interactor.getChildCaregiverReadinessByPatientId(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  async onGetChildCaregiverReadinessByVisitId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const result =
        await this.interactor.getChildCaregiverReadinessByVisitId(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //

  async onGetAllChildCaregiverReadinessByVisitId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const result =
        await this.interactor.getAllChildCaregiverReadinessByVisitId(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
