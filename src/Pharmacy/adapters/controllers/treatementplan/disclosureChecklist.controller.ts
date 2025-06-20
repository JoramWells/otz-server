import { DisclosureChecklistAttributes } from 'otz-types';
import { DisclosureChecklist } from '../../../domain/models/treatmentplan/disclosureChecklist.model';

import { Request, Response, NextFunction } from 'express';


export class DisclosureChecklistController {


    async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<DisclosureChecklistAttributes> {
        const { data } = req.body
        const results = await DisclosureChecklist.create(data);

        return results;
    }

    async find(req: Request,
        res: Response,
        next: NextFunction) {

        const results = await DisclosureChecklist.findAll({});

        res.json(results);
    }

    async findById(req: Request,
        res: Response,
        next: NextFunction){
        const { id } = req.params;
        const results: DisclosureChecklist | null =
            await DisclosureChecklist.findOne({
                where: {
                    patientVisitID: id,
                },
            });



        res.json(results);
    }

    async findAllByVisitId(req: Request,
        res: Response,
        next: NextFunction): Promise<DisclosureChecklistAttributes[] | null> {
        const { id } = req.params;
        const results: DisclosureChecklist[] | null =
            await DisclosureChecklist.findAll({
                where: {
                    patientVisitID: id,
                },
            });



        return results;
    }
}
