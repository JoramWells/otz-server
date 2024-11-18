/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { OTZEnrollmentsInterface } from "otz-types";

import { IOTZRepository } from "../../../application/interfaces/enrollment/IOTZRepository";
import { OTZ } from "../../../domain/models/enrollment/otz.model";
import { Patient } from "../../../domain/models/patients.models";


export class OTZRepository implements IOTZRepository {
  async create(data: OTZEnrollmentsInterface): Promise<OTZEnrollmentsInterface> {
    const results: OTZEnrollmentsInterface = await OTZ.create(data);
    return results;
  }

  async find(): Promise<OTZEnrollmentsInterface[]> {
    const results = await OTZ.findAll({
      include: [
        {
          model: Patient,
          attributes: ["firstName", "middleName"],
        },
      ],
    });
    return results;
  }

  async findById(id: string): Promise<OTZEnrollmentsInterface | null> {
    const results = await OTZ.findOne({
      where: {
        id,
      },
    });

    return results;
  }
}
