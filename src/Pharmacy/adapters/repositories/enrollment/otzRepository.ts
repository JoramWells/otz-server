/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { OTZEnrollmentsInterface } from "otz-types";

import { IOTZRepository } from "../../../application/interfaces/enrollment/IOTZRepository";
import { OTZ } from "../../../domain/models/enrollment/otz.model";
import { Patient } from "../../../domain/models/patients.models";
import { User } from "../../../domain/models/user.model";
import { ARTPrescription } from "../../../domain/models/art/artPrescription.model";
import { ViralLoad } from "../../../domain/models/lab/viralLoad.model";

export class OTZRepository implements IOTZRepository {
  async create(
    data: OTZEnrollmentsInterface
  ): Promise<OTZEnrollmentsInterface> {
    const results: OTZEnrollmentsInterface = await OTZ.create(data);
    return results;
  }

  async find(hospitalID: string): Promise<OTZEnrollmentsInterface[]> {
    const results = await OTZ.findAll({
      include: [
        {
          model: Patient,
          attributes: ["firstName", "middleName","dob", "sex"],
        },
        {
          model: User,
          attributes: ["firstName", "middleName"],
          where: {
            hospitalID,
          },
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
    return results;
  }

  async findById(id: string): Promise<OTZEnrollmentsInterface | null> {
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

    return results;
  }
}
