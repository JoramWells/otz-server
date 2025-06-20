// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'

import { ExecuteDisclosureAttributes } from "otz-types";
import { ExecuteDisclosure } from "../../../../domain/models/treatmentplan/disclosure/full/executeDisclosure.model";
import { Patient } from "../../../../domain/models/patients.models";
import { completeFullDisclosure } from "../../../../utils/completeFullDisclosure";
import { Request, Response, NextFunction } from 'express';


export class ExecuteDisclosureController{
  // private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
       req: Request,
        res: Response,
        next: NextFunction
  ): Promise<ExecuteDisclosureAttributes> {
    const results = await ExecuteDisclosure.create(req.body);
    if (results) {
      await completeFullDisclosure({
        executeDisclosure: results,
        postDisclosure: undefined,
      });
    }

    res.json (results);
  }

  async find(   req: Request,
        res: Response,
        next: NextFunction){
    // await this.redisClient.connect();

    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
    const results = await ExecuteDisclosure.findAll({
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
  ): Promise<ExecuteDisclosureAttributes | null | undefined> {
    try {
      const { id } = req.params;
      const results: ExecuteDisclosure | null = await ExecuteDisclosure.findOne(
        {
          where: {
            id,
          },
        }
      );

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
  ): Promise<ExecuteDisclosureAttributes | null | undefined> {
    const { id } = req.params;
    try {
      // await this.redisClient.connect();
      // if ((await this.redisClient.get(id)) === null) {
      const results: ExecuteDisclosure | null = await ExecuteDisclosure.findOne(
        {
          order: [["createdAt", "DESC"]],
          where: {
            patientVisitID: id,
          },
        }
      );

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
  ): Promise<ExecuteDisclosureAttributes | null | undefined> {
    const { id } = req.params;
    try {
      const results: ExecuteDisclosure | null = await ExecuteDisclosure.findOne(
        {
          order: [["createdAt", "DESC"]],
          where: {
            patientID: id,
          },
        }
      );

      res.json (results);
    } catch (error) {
      console.log(error);
    }
  }

  async findAllByVisitId(
      req: Request,
        res: Response,
        next: NextFunction
  ) {
    const { id } = req.params;
    const results: ExecuteDisclosure[] | null = await ExecuteDisclosure.findAll(
      {
        where: {
          patientVisitID: id,
        },
      }
    );

    res.json (results);
  }
}
