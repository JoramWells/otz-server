// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
// import { mmasCache } from '../../../constants/appointmentCache';

import { PostDisclosureAttributes } from "otz-types";
import { PostDisclosure } from "../../../../domain/models/treatmentplan/disclosure/full/postDisclosureAssessment.model";
import { Patient } from "../../../../domain/models/patients.models";
import { Request, Response, NextFunction } from 'express';
import { completeFullDisclosure } from "../../../../utils/treatmentPlan/completeFullDisclosure";

export class PostDisclosureController {

  async create(
     req: Request,
        res: Response,
        next: NextFunction
  ): Promise<PostDisclosureAttributes> {
    const results = await PostDisclosure.create(req.body);
    if (results) {
      await completeFullDisclosure({
        executeDisclosure: undefined,
        postDisclosure: results,
      });
    }
    return results;
  }

  async find(  req: Request,
        res: Response,
        next: NextFunction){

    const results = await PostDisclosure.findAll({
      include: [
        {
          model: Patient,
          attributes: ["firstName", "middleName", "avatar"],
        },
      ],
    });

    res.json (results);
  }

  async findById(
      req: Request,
        res: Response,
        next: NextFunction
  ){
    const { id } = req.params;
    try {
      // await this.redisClient.connect();
      // if ((await this.redisClient.get(id)) === null) {
      const results = await PostDisclosure.findOne({
        where: {
          id,
        },
      });

      res.json (results);
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
    
      const results = await PostDisclosure.findOne({
        order: [["createdAt", "DESC"]],
        where: {
          patientID: id,
        },
      });

      res.json (results);
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
const { id } = req.params;
    try {
      const results = await PostDisclosure.findOne({
        order: [["createdAt", "DESC"]],
        where: {
          patientID: id,
        },
      });

      res.json (results);
    } catch (error) {
      console.log(error);
    }
  }

  async findAllByVisitId(
      req: Request,
        res: Response,
        next: NextFunction
  ): Promise<PostDisclosureAttributes[] | null> {
    const { id } = req.params;
    const results: PostDisclosure[] | null = await PostDisclosure.findAll({
      where: {
        patientVisitID: id,
      },
    });

    return results;
  }
}
