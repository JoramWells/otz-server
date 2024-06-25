/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { ICoursesInteractor } from "../../../application/interfaces/articles/ICoursesInteractor";
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class CoursesController {
  private readonly interactor: ICoursesInteractor;

  constructor(interactor: ICoursesInteractor) {
    this.interactor = interactor;
  }

  async onCreateCourses(req: Request, res: Response, next: NextFunction) {
    try {
      const data = { ...req.body, thumbnail: req.file?.filename };
      console.log(data);
      const newProfile = await this.interactor.createCourses(data);
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

  async onGetAllCourses(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllCourses();
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      // console.log(error)
    }
  }

  async onGetCoursesById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getCoursesById(id);
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
  //     const result = await this.interactor.getAllBooksById(id);
  //     res.status(200).json(result);
  //     next();
  //   } catch (error) {
  //     next(error);
  //     console.log(error);
  //     res.status(500).json({ message: "Internal Server Error" });
  //   }
  // }
}
