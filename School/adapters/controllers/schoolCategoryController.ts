import { NextFunction, Request, Response } from "express";
import { ISchoolCategoryInteractor } from "../../application/interfaces/ISchoolCategoryInteractor";

export class SchoolCategoryController{

    private interactor: ISchoolCategoryInteractor

    constructor (interactor: ISchoolCategoryInteractor){
        this.interactor = interactor
    }

    async onCreateSchoolCategory(req:Request, res: Response, next: NextFunction){
        try {
            const result = await this.interactor.createSchoolCategory(req.body)
            res.json(result)
            next()
        } catch (error) {
            res.status(500).json({message:'Internal server error'})
            next(error)
        }
    }
}