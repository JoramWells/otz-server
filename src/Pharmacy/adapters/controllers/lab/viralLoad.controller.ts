/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */

import { ViralLoadInterface } from "otz-types";
import { ViralLoad } from "../../../domain/models/lab/viralLoad.model";
import { Patient } from "../../../domain/models/patients.models";
import { col, fn, literal, Op, WhereOptions } from "sequelize";
import { connect } from "../../../domain/db/connect";
import { ImportantPatient } from "../../../domain/models/importantPatients";
import {
    calculateLimitAndOffset,
    calculateMaxAge,
} from "../../../utils/calculateLimitAndOffset";
import { validate as isUUID } from "uuid";
import { Appointment } from "../../../domain/models/appointment/appointment.model";
import { Request, Response, NextFunction } from 'express';

const getWeekRange = (query: string) => {
    const date = new Date();
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());

    let endOfWeek = new Date(date);
    if (query === "7D") {
        endOfWeek.setDate(date.getDate() + (6 - date.getDay()));
    } else if (query === "14D") {
        endOfWeek.setDate(date.getDate() + (13 - date.getDay()));
    } else if (query === "21D") {
        endOfWeek.setDate(date.getDate() + (20 - date.getDay()));
    } else if (query === "1 month") {
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return {
            start: startOfMonth.toISOString().split("T")[0],
            end: endOfMonth.toISOString().split("T")[0],
        };
    }

    return {
        start: startOfWeek.toISOString().split("T")[0],
        end: endOfWeek.toISOString().split("T")[0],
    };
};



export class ViralLoadController {

    async create(req: Request,
        res: Response,
        next: NextFunction){
        try {
            const {
                userID,
                patientID,
                patientVisitID,
                appointmentAgendaID,
                appointmentStatusID,
                appointmentDate,
                dateOfVL,
                dateOfNextVL,
                vlResults,
                vlJustification,
            } = req.body;

            const results = await connect.transaction(async (t) => {
                const [vl, appointment] = await Promise.all([
                    ViralLoad.create(
                        {
                            userID,
                            dateOfVL,
                            dateOfNextVL,
                            vlResults,
                            vlJustification,
                            patientVisitID,
                            patientID,
                        },
                        { transaction: t }
                    ),
                    Appointment.create(
                        {
                            userID,
                            patientID,
                            patientVisitID,
                            appointmentAgendaID,
                            appointmentStatusID,
                            appointmentDate,
                        },
                        { transaction: t }
                    ),
                    // markAsCompletedAppointment(patientID, "viral load"),
                ]);
                res.json(vl);
            });
            // await this.kafkaProducer.sendMessage("complete", [
            //     {
            //         value: JSON.stringify({ patientID, agenda: "viral load" }),
            //     },
            // ]);
            res.json (results);
        } catch (error) {
            console.log(error);
        }
    }

    async find(

        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { hospitalID, page, pageSize, searchQuery, vlResults, vlJustification, status } = req.body
        try {
            let maxDate = calculateMaxAge(24);
            let vlWhere = {};
            if (vlJustification) {
                vlWhere = {
                    ...vlWhere,
                    vlJustification: vlJustification,
                };
            }

            if (vlResults.length > 0) {
                if (vlResults.toLowerCase() === "ldl") {
                    vlWhere = {
                        ...vlWhere,
                        vlResults: {
                            [Op.lte]: 49,
                        },
                    };
                } else if (vlResults.toLowerCase() === "low risk llv") {
                    vlWhere = {
                        ...vlWhere,
                        vlResults: {
                            [Op.between]: [50, 199],
                        },
                    };
                } else if (vlResults.toLowerCase() === "high risk llv") {
                    vlWhere = {
                        ...vlWhere,
                        vlResults: {
                            [Op.between]: [200, 999],
                        },
                    };
                } else if (vlResults.toLowerCase() === "suspected treatment failure") {
                    vlWhere = {
                        ...vlWhere,
                        vlResults: {
                            [Op.gte]: 1000,
                        },
                    };
                }
            }

            if (status.length > 0) {
                vlWhere = {
                    ...vlWhere,
                    isVLValid: status === "valid" ? true : false,
                };
            }

            let where = {
                dob: { [Op.gte]: maxDate }, // Default filter
            };

            if (isUUID(hospitalID)) {
                where = {
                    ...where,
                    hospitalID,
                };
            }

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

            const { limit, offset } = calculateLimitAndOffset(page, pageSize);

            const { rows, count } = await ViralLoad.findAndCountAll({
                order: [["createdAt", "DESC"]],
                where: vlWhere,
                limit,
                offset,
                include: [
                    {
                        model: Patient,
                        attributes: ["id", "firstName", "middleName", "dob", "sex"],
                        where,
                    },
                ],
            });
            res.json({
                data: rows,
                total: count,
                page: page,
                pageSize: limit,
            });
        } catch (error) {
            console.log(error);
        }
    }

    async findSuppressionRate(

        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { hospitalID, startDate, endDate } = req.body
        try {
            let where = {};
            let patientWhere = {};
            if (startDate && endDate) {
                where = {
                    ...where,
                    createdAt: {
                        [Op.between]: { startDate, endDate },
                    },
                };
            }

            if (hospitalID) {
                patientWhere = {
                    ...patientWhere,
                    hospitalID,
                };
            }

            const results = await ViralLoad.findAll({
                limit: 10,
                // include: [
                //   {
                //     model: Patient,
                //     where: patientWhere,
                //     attributes:[]
                //   },
                // ],
                attributes: [
                    [fn("DATE_TRUNC", "month", col("ViralLoad.createdAt")), "month"],
                    [
                        literal(`
        CASE 
          WHEN COUNT(*) = 0 THEN 0 
          ELSE 
            (SUM(CASE WHEN "vlResults" <= 50 AND "isVLValid" = true THEN 1 ELSE 0 END)::FLOAT 
            / 
            COUNT(*)) * 100
        END
      `),
                        "suppressionRate",
                    ],
                ],
                group: ["ViralLoad.id"],
                // where,
            });
            res.json (results);
        } catch (error) {
            console.log(error);
        }
    }

    async findById(
        req: Request,
        res: Response,
        next: NextFunction

    ){
        const { id } = req.params
        try {
            const results = await ViralLoad.findOne({
                order: [["createdAt", "DESC"]],

                // include: [
                //   {
                //     model: Patient,
                //     attributes: ["firstName", "middleName", "dob", "sex"],
                //   },
                //   {
                //     model: User,
                //     attributes: ["firstName", "middleName"],
                //   },
                //   {
                //     model: ARTPrescription,
                //     attributes: ["regimen", "line", "startDate"],
                //   },
                //   {
                //     model: ViralLoad,
                //     attributes: ["vlResults", "dateOfVL", "vlJustification"],
                //   },
                // ],
                where: {
                    patientID: id,
                },
            });

            res.json(results);
        } catch (error) {
            console.log(error);
        }
    }

    //
    async findByPatientId(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        const { id } = req.params
        try {
            const results = await ViralLoad.findAll({
                // include: [
                //   {
                //     model: Patient,
                //     attributes: ["firstName", "middleName", "dob", "sex"],
                //   },
                //   {
                //     model: User,
                //     attributes: ["firstName", "middleName"],
                //   },
                //   {
                //     model: ARTPrescription,
                //     attributes: ["regimen", "line", "startDate"],
                //   },
                //   {
                //     model: ViralLoad,
                //     attributes: ["vlResults", "dateOfVL", "vlJustification"],
                //   },
                // ],
                where: {
                    patientID: id,
                },
            });

            res.json(results);
        } catch (error) {
            console.log(error);
        }
    }

    //
    async findCategories(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { id } = req.params
        try {
            const results = await ViralLoad.findAll({
                include: [
                    {
                        model: Patient,
                        attributes: [],
                        where: {
                            hospitalID: id,
                        },
                    },
                ],
                attributes: [
                    [
                        literal(`CASE
      WHEN "vlResults"::numeric < 50 THEN 'LDL'
      WHEN "vlResults"::numeric BETWEEN 50 AND 199 THEN 'Low RiskLLV'
      WHEN "vlResults"::numeric BETWEEN 200 AND 999 THEN 'High Risk LLV'
      ELSE 'Suspected Treatment Failure'
      END`),
                        "category",
                    ],
                    [fn("COUNT", col("*")), "count"],
                ],
                group: ["category"],
            });

            return results;
        } catch (error) {
            console.log(error);
        }
    }

    async findAllVlReasons(
        req: Request,
        res: Response,
        next: NextFunction

    ) {
        const { hospitalID, dateQuery } = req.body
        try {
            const currentDate = new Date();
            const maxDate = new Date(
                currentDate.getFullYear() - 25,
                currentDate.getMonth(),
                currentDate.getDate()
            );

            let where: WhereOptions = {
                dateOfNextVL: {
                    [Op.ne]: null,
                },
            };

            if (dateQuery || dateQuery?.toLowerCase() !== "All".toLowerCase()) {
                const { start, end } = getWeekRange(dateQuery);
                where = {
                    ...where,
                    dateOfNextVL: {
                        [Op.between]: [start, end],
                    },
                };
            }

            const results = await ViralLoad.findAll({
                where,
                include: [
                    {
                        model: Patient,
                        attributes: [],
                        where: {
                            hospitalID,
                            dob: {
                                [Op.gte]: maxDate,
                            },
                        },
                    },
                ],
                attributes: [
                    [fn("COUNT", col("vlJustification")), "count"],
                    // [fn("DATE_FORMAT", col("dateOfVL"), "%Y-%m-%d"), "formattedDateOfVl"],
                    [literal('CAST("dateOfNextVL" AS DATE)'), "formattedDateOfVl"],
                    "vlJustification",
                ],
                group: ["vlJustification", literal('"formattedDateOfVl"')],
            });
            res.json(results.map((result) => {
                const value = {};
                const justification = result.dataValues.vlJustification;
                const count = result.dataValues.count;
                (value[justification] = count),
                    (value.dateOfVl = result.dataValues.formattedDateOfVl);
                value.count = count;
                value.vlJustification = justification;
                return value;
            }));
        } catch (error) {
            console.log(error);
        }
    }

    //
    //
    async findStarredViralLoad(

        req: Request,
        res: Response,
        next: NextFunction

    ){
        const { hospitalID, page, pageSize, searchQuery } = req.body
        const { limit, offset } = calculateLimitAndOffset(page, pageSize);

        const importantPatient = await ImportantPatient.findAll({
            include: [
                {
                    model: Patient,
                    where: {
                        hospitalID,
                    },
                    attributes: [],
                },
            ],
            attributes: ["patientID"],
        });

        const importantPatientIDs = importantPatient.map(
            (patient) => patient.patientID
        );

        const where = searchQuery
            ? {
                [Op.or]: [
                    { firstName: { [Op.iLike]: `%${searchQuery}%` } },
                    { middleName: { [Op.iLike]: `%${searchQuery}%` } },
                    { cccNo: { [Op.iLike]: `%${searchQuery}%` } },
                    { lastName: { [Op.iLike]: `%${searchQuery}%` } },
                ],
                hospitalID,
                // dob: {
                //   [Op.lte]: maxDate,
                // },
                id: {
                    [Op.in]: importantPatientIDs,
                },
            }
            : {
                hospitalID,
                // dob: {
                //   [Op.lte]: maxDate,
                // },
                id: {
                    [Op.in]: importantPatientIDs,
                },
            };

        try {
            const { rows, count } = await ViralLoad.findAndCountAll({
                order: [["createdAt", "DESC"]],
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
                page: page,
                pageSize: limit,
            });
        } catch (error) {
            console.log(error);
        }
    }

    //
    async findRecent(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const { hospitalID } = req.body
        try {
            let where = {};

            if (isUUID(hospitalID)) {
                where = {
                    ...where,
                    hospitalID,
                };
            }

            const results = await ViralLoad.findAll({
                order: [["createdAt", "DESC"]],
                attributes: [
                    "dateOfVL",
                    "dateOfNextVL",
                    "vlResults",
                    "isVLValid",
                ],
                limit: 5,
                include: [
                    {
                        model: Patient,
                        attributes: ["firstName", "middleName"],
                        where: {
                            hospitalID,
                        },
                    },
                ],
            });
            res.json (results);
        } catch (error) {
            console.log(error);
        }
    }
}
