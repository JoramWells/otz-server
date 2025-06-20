// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
// import { mmasCache } from '../../../constants/appointmentCache';
import {
  ChildDisclosureEligibilityAttributes,
} from "otz-types";
import { ChildDisclosureEligibility } from "../../../../domain/models/treatmentplan/disclosure/childDisclosureEligibility.model";
import { Patient } from "../../../../domain/models/patients.models";
import { completePartialDisclosure } from "../../../../utils/completePartialDisclosure";
import { Request, Response, NextFunction } from 'express';

export class DisclosureEligibilityController {


  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ChildDisclosureEligibilityAttributes | undefined | null> {
    // return await connect.transaction(async (t) => {
    try {
      const results = await ChildDisclosureEligibility.create(data);
      if (results) {
        await completePartialDisclosure({
          childCaregiverReadiness: undefined,
          childDisclosureEligibility: results,
        });
      }

      return results;
    } catch (error) {
      console.log(error);
    }
    // });
  }

  async find(req: Request,
    res: Response,
    next: NextFunction): Promise<ChildDisclosureEligibilityAttributes[]> {

    const results = await ChildDisclosureEligibility.findAll({
      include: [
        {
          model: Patient,
          attributes: ["firstName", "middleName", "avatar"],
        },
      ],
    });

    return results;
  }

  async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ChildDisclosureEligibilityAttributes | null | undefined> {
    const { id } = req.params;

    try {
      const results: ChildDisclosureEligibility | null =
        await ChildDisclosureEligibility.findOne({
          where: {
            id,
          },
        });
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async findByPatientId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ChildDisclosureEligibilityAttributes | null | undefined> {
    const { id } = req.params;

    try {
      const results = await ChildDisclosureEligibility.findOne({
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

  //
  async findByVisitId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ChildDisclosureEligibilityAttributes | null | undefined> {
    const { id } = req.params;

    try {
      const results = await ChildDisclosureEligibility.findOne({
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

  async findAllByVisitId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ChildDisclosureEligibilityAttributes[] | null> {
    const { id } = req.params;
    const results: ChildDisclosureEligibility[] | null =
      await ChildDisclosureEligibility.findAll({
        where: {
          patientVisitID: id,
        },
      });

    return results;
  }
}
