/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'

import { IPMTCTProfileRepository } from "../../../application/interfaces/enrollment/IPMTCTProfileRepository"
import { PMTCTProfileInterface } from "otz-types";
import { PMTCTProfile } from "../../../domain/models/enrollment/pmtct/pmtctProfile.model";
import { Patient } from "../../../domain/models/patients.models";
export class PMTCTProfileRepository implements IPMTCTProfileRepository {
  async create(data: PMTCTProfileInterface): Promise<PMTCTProfileInterface> {
    const results: PMTCTProfileInterface = await PMTCTProfile.create(data);
    return results;
  }

  async find(): Promise<PMTCTProfileInterface[]> {
    const results = await PMTCTProfile.findAll({
      include: [
        {
          model: Patient,
          attributes: ["firstName", "middleName", "dob"],
        },
      ],
    });
    return results;
  }

  async findById(id: string): Promise<PMTCTProfileInterface | null> {
    const results = await PMTCTProfile.findOne({
      where: {
        id,
      },
    });

    return results;
  }
}
