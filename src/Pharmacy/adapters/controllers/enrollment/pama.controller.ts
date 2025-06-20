/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */

import { PAMAInterface } from "otz-types";
import { PAMAProfile } from "../../../domain/models/enrollment/pama/pamaProfile.models";
import { Patient } from "../../../domain/models/patients.models";
import { Request, Response, NextFunction } from 'express';

export class PAMAController {
    async create(req: Request,
        res: Response,
        next: NextFunction): Promise<PAMAInterface> {
        const results: PAMAInterface = await PAMAProfile.create(req.body)
        return results
    }

    async find(req: Request,
        res: Response,
        next: NextFunction) {
        const results = await PAMAProfile.findAll({
            include: [
                {
                    model: Patient,
                    attributes: ['firstName', 'middleName']
                }
            ]
        })
        res.json(results)
    }

    async findById(req: Request,
        res: Response,
        next: NextFunction): Promise<PAMAInterface | null> {
        const { id } = req.params;
        const results = await PAMAProfile.findOne({
            where: {
                id
            }
        })

        return results
    }
}
