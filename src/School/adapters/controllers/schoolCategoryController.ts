import { NextFunction, Request, Response } from "express";
import { ISchoolCategoryInteractor } from "../../application/interfaces/ISchoolCategoryInteractor";

export class SchoolCategoryController {
  private interactor: ISchoolCategoryInteractor;

  constructor(interactor: ISchoolCategoryInteractor) {
    this.interactor = interactor;
  }

  async onCreateSchoolCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.interactor.createSchoolCategory(req.body);
      res.json(result);
      next();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      next(error);
    }
  }
  async onReadSchoolCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const results = await this.interactor.readSchoolCategories();
      res.status(200).json(results);
      next();
    } catch (error) {
      next(error);
    }
  }
  async onReadSchoolCategoryById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
        const {id} = req.params
        if(id === 'null'){
            res.status(200)
        }
       const results = await this.interactor.readSchoolCategoryById(id) 
       res.status(200).json(results)
       next()
    } catch (error) {
        res.status(500).json({message:'Internal Serval Error'})
        next(error)
    }
  }
}