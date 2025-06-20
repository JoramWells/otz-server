
import { HomeVisitFrequency } from "../../../domain/models/homevisit/homeVisitFrequency.model"
import { Request, Response, NextFunction } from 'express';

export class HomeVisitFrequencyController {
    async create(req: Request,
        res: Response,
        next: NextFunction) {
        const results = await HomeVisitFrequency.create(req.body)

        res.json(results)
    }

    async find(req: Request,
        res: Response,
        next: NextFunction) {
        const results = await HomeVisitFrequency.findAll({})
        res.json(results)
    }

    async findById(req: Request,
        res: Response,
        next: NextFunction){
        const { id } = req.params
        const results = await HomeVisitFrequency.findOne({
            where: {
                id
            }
        })

        res.json (results)
    }
}
