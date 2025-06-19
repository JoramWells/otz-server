/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { VLReasonsInterface } from "otz-types";
import { VLJustification } from "../../../domain/models/lab/vlJustification.model";
import { Request, Response, NextFunction } from 'express';

export class VLJustificationController {
    async create(req: Request,
        res: Response,
        next: NextFunction): Promise<VLReasonsInterface> {
        try {
            const results: VLReasonsInterface = await VLJustification.create(req.body);

            res.json(results);
        } catch (error) {
            console.log(error);
        }
    }

    async find(req: Request,
        res: Response,
        next: NextFunction) {
        try {
            const results = await VLJustification.findAll({});
            res.json(results);
        } catch (error) {
            console.log(error);
        }
    }

    async findById(req: Request,
        res: Response,
        next: NextFunction): Promise<VLReasonsInterface | null | undefined> {
        const { id } = req.params;
        try {
            const results = await VLJustification.findOne({
                where: {
                    id,
                },
            });

            results.json(results);
        } catch (error) {
            console.log(error)
        }
    }
}
