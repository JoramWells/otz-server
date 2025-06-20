// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
import { ChildCaregiverReadinessAttributes } from "otz-types";
import { ChildCaregiverReadiness } from "../../../../domain/models/treatmentplan/disclosure/childCaregiverReadiness.model";
import { Patient } from "../../../../domain/models/patients.models";
import { Request, Response, NextFunction } from 'express';
import { completePartialDisclosure } from "../../../../utils/treatmentPlan/completePartialDisclosure";

export class ChildCaregiverReadinessController
{

  async create(
         req: Request,
        res: Response,
        next: NextFunction
  ): Promise<ChildCaregiverReadinessAttributes | undefined | null> {
    try {
      const results = await ChildCaregiverReadiness.create(req.body);

      if (results) {
        await completePartialDisclosure({
          childCaregiverReadiness: results,
          childDisclosureEligibility: undefined,
        });
      }

      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async find(   req: Request,
        res: Response,
        next: NextFunction): Promise<ChildCaregiverReadinessAttributes[]> {
      const { id:hospitalID } = req.params;

    const results = await ChildCaregiverReadiness.findAll({
      include: [
        {
          model: Patient,
          attributes: ["firstName", "middleName", "avatar"],
          where: {
            hospitalID,
          },
        },
      ],
    });

    return results;
  }

  async findById(
       req: Request,
        res: Response,
        next: NextFunction
  ): Promise<ChildCaregiverReadinessAttributes | null | undefined> {
        const { id } = req.params;

    try {
      const results: ChildCaregiverReadiness | null =
        await ChildCaregiverReadiness.findOne({
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
  ): Promise<ChildCaregiverReadinessAttributes | null | undefined> {
    try {
       const { id } = req.params;

      try {
        const results: ChildCaregiverReadiness | null =
          await ChildCaregiverReadiness.findOne({
            order: [["createdAt", "DESC"]],
            where: {
              patientVisitID: id,
            },
          });

        return results;
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //
  async findByPatientId(
      req: Request,
        res: Response,
        next: NextFunction
  ): Promise<ChildCaregiverReadinessAttributes | null | undefined> {
    const { id } = req.params;

    try {
      const results: ChildCaregiverReadiness | null =
        await ChildCaregiverReadiness.findOne({
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

  async findAllByVisitId(
       req: Request,
        res: Response,
        next: NextFunction
  ): Promise<ChildCaregiverReadinessAttributes[] | null> {
    const { id } = req.params;
    const results: ChildCaregiverReadiness[] | null =
      await ChildCaregiverReadiness.findAll({
        where: {
          patientVisitID: id,
        },
      });

    return results;
  }
}
