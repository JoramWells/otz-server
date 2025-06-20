import { HomeVisitReasonAttributes } from "otz-types"
import { HomeVisitReason } from "../../../domain/models/homevisit/homeVisitReason.model"
import { Request, Response, NextFunction } from 'express';

export class HomeVisitReasonController {
    async create(req: Request,
        res: Response,
        next: NextFunction) {
        const results: HomeVisitReasonAttributes = await HomeVisitReason.create(req.body)

        res.json(results)
    }

    async find(req: Request,
        res: Response,
        next: NextFunction) {
        const results = await HomeVisitReason.findAll()
        res.json(results)
    }

    async findById(req: Request,
        res: Response,
        next: NextFunction) {
        const { id } = req.params
        const results = await HomeVisitReason.findOne({
            where: {
                id
            }
        })

        res.json(results)
    }
}
