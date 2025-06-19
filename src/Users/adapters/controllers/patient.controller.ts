
import { Op, where, WhereOptions } from "sequelize";
import { validate as isUUID } from "uuid";

import { connect } from "../../domain/db/connect";
import { Hospital } from "../../domain/models/hospital/hospital.model";
import { NextOfKin } from "../../domain/models/nextOfKin.model";
import {
    generateDefaultHashedPassword,
    Patient,
    PatientResponseInterface,
} from "../../domain/models/patients.models";
import { School } from "../../domain/models/school/school.model";
import { logger } from "../../utils/logger";
// import bcrypt from "bcrypt";
// import { createClient } from 'redis'
import { NextOfKinInterface, PatientAttributes } from "otz-types";
import CaseManager from "../../domain/models/casemanager.model";
import { User } from "../../domain/models/user/user.model";
import { calculateLimitAndOffset } from "../../utils/calculateLimitAndOffset";
import { Request, Response, NextFunction } from "express";

export class PatientController {

    async important(req: Request, res: Response,
    ): Promise<string | null> {
        const { id } = req.params
        const { isImportant } = req.body
     
        const results = await Patient.findByPk(id);
        if (results) {
            results.isImportant = isImportant;
            results.save();
        }
        return null;
    }

    async create(
        req: Request, res: Response, next:NextFunction

    ){
        const { data, nextOfKinData } = req.body
        // const { firstName, middleName, lastName, dob, phoneNo, cccNo, occupationID, sex, hospitalID, schoolID, idNo } = data
        let results = "";
        await connect
            .transaction(async (t) => {
                const results = await Patient.create(data, { transaction: t });

                //
                if (results) {
                    const patientID = results.id;
                    await NextOfKin.create(
                        {
                            patientID,
                            ...nextOfKinData,
                        },
                        { transaction: t }
                    );

                    // create new visit
                    // await PatientVisits.create({ patientID, userID }, { transaction: t });
                }
            })
            .then(() => {
                results = "Successfully registered a New Patient";
            });


        res.json(results);
        next()
    }

    async findAllPMTCTPatients(res:Response,next:NextFunction) {
        const results = await Patient.findAll({
            where: {
                sex: { [Op.or]: ["F", "female"] },
                dob: {
                    [Op.lte]: new Date().setFullYear(new Date().getFullYear() - 15),
                },
            },
        });
        res.json(results);
        next()
    }

    async findImportant(
        req: Request, res: Response,
        next: NextFunction
    ){
            const {limit} = req.body
        if (limit) {
            return await Patient.findAll({
                limit,
                where: {
                    isImportant: true,
                },
            });
        }
        res.json( Patient.findAll({
            where: {
                isImportant: true,
            },
        }));
        next()
    }

    async findOTZ( req: Request, res: Response, next:NextFunction ): Promise<PatientResponseInterface | undefined | null> {
        const {page,pageSize,searchQuery,hospitalID} = req.body
        try {
            let where = {
                hospitalID,
                dob: {
                    [Op.between]: [
                        new Date().setFullYear(new Date().getFullYear() - 14),
                        new Date().setFullYear(new Date().getFullYear() - 5),
                    ],
                },
            };

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
            const { limit, offset } = calculateLimitAndOffset(page, pageSize)
            const { rows, count } = await Patient.findAndCountAll({
                where,
                offset,
                limit,
                attributes: ['id', 'firstName', 'middleName', 'lastName', 'dob', 'sex', 'phoneNo']

            });
            res.json({
                data: rows,
                total: count,
                page: page,
                pageSize: limit,
            });
            next()
        } catch (error) {
            console.log(error)
        }
    }

    async find(

        req: Request, res: Response, next: NextFunction

    ): Promise<PatientResponseInterface | null | undefined> {
        const {page,pageSize,searchQuery,hospitalID, calHIVQuery, casemanager} = req.body

        const currentDate = new Date();

        let maxDate = new Date(
            currentDate.getFullYear() - 25,
            currentDate.getMonth(),
            currentDate.getDate()
        );

        let where: WhereOptions = {
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

        const ageRangeStart = new Date()
        const ageRangeEnd = new Date().setFullYear(new Date().getFullYear() - 10);,



        // Add age range filter based on `calHIVQuery`
        switch (calHIVQuery) {
            case "0-9 years":
                where = {
                    ...where,
                    dob: {
                        [Op.between]: [
                            ageRangeEnd,
                            ageRangeStart,
                        ],
                    },
                };
                break;
            case "10-14 years":
                where = {
                    ...where,
                    dob: {
                        [Op.between]: [
                            new Date().setFullYear(new Date().getFullYear() - 14),
                            new Date().setFullYear(new Date().getFullYear() - 10),
                        ],
                    },
                };
                break;
            case "15-20 years":
                where = {
                    ...where,
                    dob: {
                        [Op.between]: [
                            new Date().setFullYear(new Date().getFullYear() - 20),
                            new Date().setFullYear(new Date().getFullYear() - 15),
                        ],
                    },
                };
                break;
            case "20 years":
                where = {
                    ...where,
                    dob: {
                        [Op.between]: [
                            new Date().setFullYear(new Date().getFullYear() - 25),
                            new Date().setFullYear(new Date().getFullYear() - 20),
                        ],
                    }
                };

                break;
        }

        if (casemanager && casemanager !== 'undefined' && casemanager !== 'null') {
            const username = casemanager.split(" ")
            const firstName = username[0] || ''
            const middleName = username[1] || ''
            const caseManagers = await CaseManager.findAll({
                attributes: ['patientID'],
                include: [
                    {
                        model: User,
                        where: {
                            firstName,
                            middleName
                        }
                    }
                ]
            })
            const patientIDs = caseManagers.map(item => item.dataValues.patientID)
            where = {
                ...where,
                id: {
                    [Op.in]: patientIDs
                }
            }

        }

        //

        const { limit, offset } = calculateLimitAndOffset(page, pageSize)

        try {
            const { rows, count } = await Patient.findAndCountAll({
                order: [['updatedAt', 'DESC']],
                attributes: ['id', 'firstName', 'middleName', 'lastName', 'sex', 'dob', 'avatar', 'username', 'phoneNo', 'cccNo'],
                where,
                limit,
                offset,
                include: [
                    { model: School, attributes: ["schoolName"] },
                    {
                        model: Hospital,
                        attributes: ["hospitalName"],
                    },

                    //   {
                    //     model: ViralLoad,
                    //     attributes: [
                    //       'id',
                    //       'dateOfNextVL',
                    //       'vlResults',
                    //       'isValid',
                    //       'dateOfCurrentVL'
                    //     ]
                    //   }
                ],
                // where: {
                //   dob: {
                //     [Op.gte]: maxDate,
                //   },
                // },
            });
            res.json ({
                data: rows,
                total: count,
                page: page,
                pageSize: limit,
            });
            next()
        } catch (error) {
            console.log(error);
        }
    }

    // 
    async search(
        req: Request, res: Response,
        next: NextFunction

    ): Promise<PatientResponseInterface | null | undefined> {
        const {hospitalID, searchQuery} = req.body
        const currentDate = new Date();

        let maxDate = new Date(
            currentDate.getFullYear() - 25,
            currentDate.getMonth(),
            currentDate.getDate()
        );
        let where = {
            hospitalID,
            dob: { [Op.gte]: maxDate }, // Default filter
        };



        try {
            // Add search query filter if provided
            if (searchQuery) {
                where = {
                    ...where,
                    [Op.or]: [
                        { firstName: { [Op.iLike]: `${searchQuery}%` } },
                        { middleName: { [Op.iLike]: `${searchQuery}%` } },
                        { cccNo: { [Op.iLike]: `${searchQuery}%` } },
                    ],
                };


                const { limit, offset } = calculateLimitAndOffset(1, 10)
                const { rows, count } = await Patient.findAndCountAll({
                    order: [['updatedAt', 'DESC']],
                    limit,
                    offset,
                    attributes: ['id', 'firstName', 'middleName', 'lastName', 'sex', 'dob', 'avatar', 'username', 'phoneNo', 'cccNo'],
                    where,

                    // where: {
                    //   dob: {
                    //     [Op.gte]: maxDate,
                    //   },
                    // },
                });
                res.json({
                    data: rows,
                    total: count,
                    page: 1,
                    pageSize: 10,
                });
                next()
            }
        } catch (error) {
            console.log(error);
        }
    }

    async findUsers(): Promise<PatientAttributes[]> {
        // await this.redisClient.connect();
        // check if patient
        // if ((await this.redisClient.get(patientCache)) === null) {
        const results = await Patient.findAll({
            include: [
                { model: School, attributes: ["schoolName"] },
                {
                    model: Hospital,
                    attributes: ["hospitalName"],
                },
                //   {
                //     model: ViralLoad,
                //     attributes: [
                //       'id',
                //       'dateOfNextVL',
                //       'vlResults',
                //       'isValid',
                //       'dateOfCurrentVL'
                //     ]
                //   }
            ],
            where: {
                role: "clinician",
            },
        });
        logger.info({ message: "Fetched from db!" });
        console.log("fetched from db!");
        // set to cace
        // await this.redisClient.set(patientCache, JSON.stringify(results));

        return results;
    }

    async findById(
        req: Request, res: Response,
        next: NextFunction
        ): Promise<PatientAttributes | null> {
            const {id} = req.params

        const results: Patient | null = await Patient.findOne({
            where: {
                id,
            },
        });
        if (results === null) {
            console.log(results, "resultx");
        }

        res.json(results);
        next()
    }

    async findPatientByUserId(
        req: Request, res: Response,
        next: NextFunction
    ): Promise<PatientAttributes | null> {
        const {id} = req.params
       
        const results: Patient | null = await Patient.findOne({
            where: {
                userID: id,
            },
            attributes: ["id", "avatar"],
        });
        if (results === null) {
            console.log(results, "resultx");
        }

        res.json(results);
        next()
    }

    async editAvatar(
       
        req: Request, res: Response
    ): Promise<PatientAttributes | null> {
        const {id} = req.params
        const {avatar} = req.body
    
        const results = await Patient.findOne({
            where: {
                id,
            },
        });

        if (results) {
            results.avatar = avatar;
            await results.save();
        }
        return res.json(results);
    }

    //
    async editPassword(
    
        req: Request, res: Response

    ): Promise<PatientAttributes | null> {
        const {id} = req.params
        const {password} = req.body
        // delete cache
   

        const results = await Patient.findOne({
            where: {
                id,
            },
        });

        if (results) {
            results.password = password;
            await results.save();
        }
        return res.json(results);
    }

    //
    async editUsername(
   
        req: Request, res: Response

    ): Promise<PatientAttributes | null> {

           const {id} = req.params
        const {username} = req.body


        const results = await Patient.findOne({
            where: {
                id,
            },
        });

        if (results) {
            results.username = username;
            await results.save();
        }
        return results;
    }

    async edit(
        req: Request, res: Response

        
    ): Promise<PatientAttributes | null> {
        const {
            id,
            firstName,
            middleName,
            lastName,
            phoneNo,
            role,
            populationType,
            dob,
            dateConfirmedPositive,
            hospitalID,
            password,
        } = req.body;

   
        const results = await Patient.findOne({
            where: {
                id,
            },
        });

        if (results) {
            results.firstName = firstName;
            results.middleName = middleName;
            results.lastName = lastName;
            results.phoneNo = phoneNo;
            results.populationType = populationType;
            results.role = role;
            results.dob = dob;
            results.hospitalID = hospitalID;

            if (dateConfirmedPositive && dateConfirmedPositive?.length > 0) {
                results.dateConfirmedPositive = dateConfirmedPositive;
            }

            if (password && password?.length > 0) {
                const hashPassword = await generateDefaultHashedPassword(password);
                results.password = hashPassword;
            }
            await results.save();
        }
        return res.json(results);
    }

    //
    async login(
        req: Request, res: Response

    ): Promise<PatientAttributes | null> {
        const {cccNo, password} = req.body;
        try {
            const user: Patient | null = await Patient.findOne({
                where: { cccNo: cccNo },
            });

            // if (user !== null && user.password) {
            //   const isMatch = await bcrypt.compare(password, user.password);
            //   if (isMatch) {
            //     return user;
            //   } else {
            //     console.log("Password does not match!!");
            //     return null;
            //   }
            // }
            return null;
        } catch (error) {
            console.log("Error comparing password!!", error);
            throw new Error("Error logging in user");
        }
    }

    
    //
    async delete(
        req: Request, res: Response


    ): Promise<number | null> {
        const {id}=req.params

        const results: number | null = await Patient.destroy({
            where: {
                id,
            },
        });
        console.log("deleted cache!!");

        return res.json(results);
    }
}
