
import { CaseManagerInterface } from "otz-types";
import CaseManager from "../domain/models/casemanager.model";
import { Patient } from "../domain/models/patients.models";
import { User } from "../domain/models/user/user.model";
import { Request, Response, NextFunction } from "express";

export class CaseManagerController {
  async create(
         req: Request, res: Response,
        next: NextFunction
  ): Promise<CaseManagerInterface> {
 
    const results: CaseManagerInterface = await CaseManager.create(req.body);
 
    return results;
  }

  async find(
     req: Request, res: Response,
        next: NextFunction

  ) {
    const {hospitalID} = req.body
    try {
      const results = await CaseManager.findAll({
        attributes:[],
        include: [
          {
            model: Patient,
            attributes: ['id', "firstName", "middleName"],
          },
          {
            model: User,
            attributes: ['id',"firstName", "middleName", "phoneNo"],
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

  async findById(
         req: Request, res: Response,
        next: NextFunction

  ){
    const {id} = req.params
    const results = await CaseManager.findOne({
      where: {
        id,
      },
    });

    res.json (results);
  }

  //
  async findByPatientId(
           req: Request, res: Response,
        next: NextFunction
  ) {
    const {id} = req.params

    try {
      const results = await CaseManager.findOne({
        order:[['createdAt', 'DESC']],
        attributes:[],
        where: {
          patientID: id,
        },
        include: [
          {
            model: User,
            attributes: ["firstName", "middleName", "phoneNo"],
          },
        ],
      });

      res.json (results);
    } catch (error) {
      console.log(error);
    }
  }
}
