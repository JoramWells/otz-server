
import { OTZEnrollmentsInterface } from "otz-types";

import {
    OTZ,
    OTZResponseInterface,
} from "../../../domain/models/enrollment/otz.model";
import { Patient } from "../../../domain/models/patients.models";
import { User } from "../../../domain/models/user.model";
import { ARTPrescription } from "../../../domain/models/art/artPrescription.model";
import { ViralLoad } from "../../../domain/models/lab/viralLoad.model";
import { Op } from "sequelize";
import { Request, Response, NextFunction } from 'express';


export class OTZController {
    async create(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const results: OTZEnrollmentsInterface = await OTZ.create(req.body);
        res.json(results);
    }

    async find(

        req: Request,
        res: Response,
        next: NextFunction,

    ) {
        //
        //
        const { hospitalID, page, pageSize, searchQuery } = req.body;
        const where = searchQuery
            ? {
                [Op.or]: [
                    { firstName: { [Op.iLike]: `%${searchQuery}%` } },
                    { middleName: { [Op.iLike]: `%${searchQuery}%` } },
                    { cccNo: { [Op.iLike]: `%${searchQuery}%` } },
                ],
                hospitalID,
            }
            : {
                hospitalID,
            };

        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        const { rows, count } = await OTZ.findAndCountAll({
            limit: limit ? limit : 10,
            offset: offset ? offset : 0,
            include: [
                {
                    model: Patient,
                    attributes: ["firstName", "middleName", "dob", "sex"],
                    where,
                },
                {
                    model: User,
                    attributes: ["firstName", "middleName"],
                },
                // {
                //   model: ARTPrescription,
                //   attributes: ["regimen", "line", "startDate"],
                // },
                // {
                //   model: ViralLoad,
                //   attributes:['vlResults', 'dateOfVL']
                // }
            ],
        });
        res.json({
            data: rows,
            total: count,
            page: page,
            pageSize: limit,
        });
    }

    async findById(req: Request,
        res: Response,
        next: NextFunction) {
        const { id } = req.params
        const results = await OTZ.findOne({
            include: [
                {
                    model: Patient,
                    attributes: ["firstName", "middleName", "dob", "sex"],
                },
                {
                    model: User,
                    attributes: ["firstName", "middleName"],
                },
                {
                    model: ARTPrescription,
                    attributes: ["regimen", "line", "startDate"],
                },
                {
                    model: ViralLoad,
                    attributes: ["vlResults", "dateOfVL", "vlJustification"],
                },
            ],
            where: {
                id,
            },
        });

        res.json(results);
    }
    async delete(req: Request,
        res: Response,
        next: NextFunction,): Promise<number | null> {
        const { id } = req.params
        // await this.redisClient.del(patientCache);
        // await this.redisClient.del(id as string);
        const results: number | null = await OTZ.destroy({
            where: {
                id,
            },
        });
        console.log("deleted cache!!");

        return results;
    }
}
