import { NextFunction, Request, Response } from "express";
import { ISchoolTermHolidayInteractor } from "../../application/interfaces/ISchoolTermHolidayInteractor";

export class SchoolTermHolidayController {
  private interactor: ISchoolTermHolidayInteractor;

  constructor(interactor: ISchoolTermHolidayInteractor) {
    this.interactor = interactor;
  }

  async onCreateSchoolTermHoliday(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.interactor.createSchoolTermHoliday(req.body);
      res.json(result);
      next();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      next(error);
    }
  }
  async onReadSchoolTermHolidays(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const results = await this.interactor.readSchoolTermHolidays();
      res.status(200).json(results);
      next();
    } catch (error) {
      next(error);
    }
  }
  async onReadSchoolTermHolidayById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      if (id === "null") {
        res.status(200);
      }
      const results = await this.interactor.readSchoolTermHolidayById(id);
      res.status(200).json(results);
      next();
    } catch (error) {
      res.status(500).json({ message: "Internal Serval Error" });
      next(error);
    }
  }
} 