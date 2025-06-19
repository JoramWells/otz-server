
import { CALHIVInterface } from "otz-types";

import { CALHIV } from "../domain/models/calHIV.model";
import { validate as isUUID } from "uuid";
import { Request, Response, NextFunction } from "express";

export class CALHIVController  {
  async create(    req: Request, res: Response,
        next: NextFunction) {

    const results: CALHIVInterface = await CALHIV.create(req.body);

    res.json (results);
  }

  async find(
      req: Request, res: Response,
        next: NextFunction
  ){
    const {hospitalID} = req.body;
    try {
      let where = {};

      if (isUUID(hospitalID)) {
        where = {
          ...where,
          hospitalID,
        };
      }

      const results = await CALHIV.findAll({
        where,
      });
      res.json(results);
    } catch (error) {
      console.log(error);
    }
  }

  async findById(
      req: Request, res: Response,
        next: NextFunction

  ){
    const {id} = req.params
    const results = await CALHIV.findOne({
      where: {
        id,
      },
    });

    res.json (results);
  }

  //
  async findByHospitalId(
          req: Request, res: Response,
        next: NextFunction
  ) {
    const {hospitalID} = req.body
    try {
      let where = {};

      if (isUUID(hospitalID)) {
        where = {
          ...where,
          hospitalID,
        };
      }
      const results = await CALHIV.findOne({
        order: [["createdAt", "DESC"]],
        // attributes: [],
        where,
        // include: [
        //   {
        //     model: User,
        //     attributes: ["firstName", "middleName", "phoneNo"],
        //   },
        // ],
      });

      res.json(results);
    } catch (error) {
      console.log(error);
    }
  }
}
