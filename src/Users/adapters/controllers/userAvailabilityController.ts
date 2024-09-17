/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { type IUserAvailabilityInteractor } from '../../application/interfaces/IUserAvailabilityInteractor'
// import { Patient } from '../../domain/entities/Patient'

export class UserAvailabilityController {
  private readonly interactor: IUserAvailabilityInteractor;

  constructor(interactor: IUserAvailabilityInteractor) {
    this.interactor = interactor;
  }

  async onCreateUserAvailability(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log(req.body);
      const newProfile = await this.interactor.createUserAvailability(req.body);
      res.json(newProfile);
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async onGetAllUserAvailabilities(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const results = await this.interactor.getAllUserAvailabilities();
      res.status(200).json(results);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async onGetUserAvailabilityById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getUserAvailabilityById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async onEditUserAvailability(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (id === "undefined") return null;
      const {
        availability
      } = req.body;

      console.log(req.body)
  

      const results = await this.interactor.editUserAvailability(availability);
      res.status(200).json(results);
    } catch (error) {
      console.log(error);
    }
  }
}
