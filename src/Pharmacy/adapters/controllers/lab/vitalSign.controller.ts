/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'

import { VitalSigns } from "../../../domain/models/lab/vitalSigns.model";
import { VitalSignsInterface } from "otz-types";
import { Patient } from "../../../domain/models/patients.models";
import { Op } from "sequelize";
import { Request, Response, NextFunction } from 'express';

export class VitalSignsController {
    async create(req: Request,
        res: Response,
        next: NextFunction){
        try {
            try {
                const results: VitalSignsInterface = await VitalSigns.create(req.body);

                res.json(results);
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async find(

        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { hospitalID, page, pageSize, searchQuery } = req.body;
        try {
            const currentDate = new Date();
            let maxDate = new Date(
                currentDate.getFullYear() - 24,
                currentDate.getMonth(),
                currentDate.getDate()
            );
            let where = {
                hospitalID,
                dob: { [Op.gte]: maxDate }, // Default filter
            };

            //
            // Add search query filter if provided
            if (searchQuery) {
                where = {
                    ...where,
                    [Op.or]: [
                        { firstName: { [Op.iLike]: `%${searchQuery}%` } },
                        { middleName: { [Op.iLike]: `%${searchQuery}%` } },
                        { cccNo: { [Op.iLike]: `%${searchQuery}%` } },
                    ],
                };
            }

            const offset = (page - 1) * pageSize;
            const limit = pageSize;

            const { rows, count } = await VitalSigns.findAndCountAll({
                limit,
                offset,
                include: [
                    {
                        model: Patient,
                        where,
                    },
                ],
            });
            res.json({
                data: rows,
                total: count,
                page: 1,
                pageSize: 10,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async findById(req: Request,
        res: Response,
        next: NextFunction): Promise<VitalSignsInterface | null | undefined> {
        const { id } = req.params;
        try {
            const results = await VitalSigns.findOne({
                order: [["createdAt", "DESC"]],
                where: {
                    id,
                },
            });

            return results;
        } catch (error) {
            console.log(error);
        }
    }

    //
    async findByVisitId(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { id } = req.params;
        try {
            const results = await VitalSigns.findOne({
                order: [["createdAt", "DESC"]],
                where: {
                    patientVisitID: id,
                },
            });

            return results;
        } catch (error) {
            console.log(error);
        }
    }

    //
    async findByPatientId(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<VitalSignsInterface | null | undefined> {
        const { id } = req.params
        try {
            const results = await VitalSigns.findOne({
                order: [["createdAt", "DESC"]],
                where: {
                    patientID: id,
                },
            });

            return results;
        } catch (error) {
            console.log(error);
        }
    }
}
