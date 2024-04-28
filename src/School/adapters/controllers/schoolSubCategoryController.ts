import { NextFunction, Request, Response } from "express";
import { ISchoolSubCategoryInteractor } from "../../application/interfaces/ISchoolSubCategoryInteractor";

export class SchoolSubCategoryController {
  private interactor: ISchoolSubCategoryInteractor;

  constructor(interactor: ISchoolSubCategoryInteractor) {
    this.interactor = interactor;
  }

  async onCreateSchoolSubCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.interactor.createSchoolSubCategory(req.body);
      res.json(result);
      next();
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Internal server error" });
      next(error);
    }
  }
  async onReadSchoolSubCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const results = await this.interactor.readSchoolSubCategories();
      res.status(200).json(results);
      next();
    } catch (error) {
      next(error);
    }
  }
  async onReadSchoolSubCategoryById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      if (id === "null") {
        res.status(200);
      }
      const results = await this.interactor.readSchoolSubCategoryById(id);
      res.status(200).json(results);
      next();
    } catch (error) {
      res.status(500).json({ message: "Internal Serval Error" });
      next(error);
    }
  }
}