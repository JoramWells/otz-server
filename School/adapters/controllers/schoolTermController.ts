import { NextFunction, Request, Response } from "express";
import { ISchoolTermInteractor } from "../../application/interfaces/ISchoolTermInteractor";

export class SchoolTermController {
  private interactor: ISchoolTermInteractor;

  constructor(interactor: ISchoolTermInteractor) {
    this.interactor = interactor;
  }

  async onCreateSchoolTerm(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.interactor.createSchoolTerm(req.body);
      res.json(result);
      next();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      next(error);
    }
  }
  async onReadSchoolTerms(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const results = await this.interactor.readSchoolTerms();
      res.status(200).json(results);
      next();
    } catch (error) {
      next(error);
    }
  }
  async onReadSchoolTermById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      if (id === "null") {
        res.status(200);
      }
      const results = await this.interactor.readSchoolTermById(id);
      res.status(200).json(results);
      next();
    } catch (error) {
      res.status(500).json({ message: "Internal Serval Error" });
      next(error);
    }
  }
} 