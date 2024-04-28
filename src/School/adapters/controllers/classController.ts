import { NextFunction, Request, Response } from "express";
import { ISchoolClassInteractor } from "../../application/interfaces/IClassInteractor";

export class ClassController {
  private interactor: ISchoolClassInteractor;

  constructor(interactor: ISchoolClassInteractor) {
    this.interactor = interactor;
  }

  async onCreateClass(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.interactor.createClass(req.body);
      res.json(result);
      next();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      next(error);
    }
  }
  async onReadClasses(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const results = await this.interactor.readClasses();
      res.status(200).json(results);
      next();
    } catch (error) {
      next(error);
    }
  }
  async onReadClassById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      if (id === "null") {
        res.status(200);
      }
      const results = await this.interactor.readClassById(id);
      res.status(200).json(results);
      next();
    } catch (error) {
      res.status(500).json({ message: "Internal Serval Error" });
      next(error);
    }
  }
}