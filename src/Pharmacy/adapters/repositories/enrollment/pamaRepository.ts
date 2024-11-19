/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */

import { IPAMARepository } from "../../../application/interfaces/enrollment/IPAMARepository"
import { PAMAInterface } from "otz-types";
import { PAMAProfile } from "../../../domain/models/enrollment/pama/pamaProfile.models";
import { Patient } from "../../../domain/models/patients.models";

export class PAMARepository implements IPAMARepository {
  async create (data: PAMAInterface): Promise<PAMAInterface> {
    const results: PAMAInterface = await PAMAProfile.create(data)
    return results
  }

  async find (): Promise<PAMAInterface[]> {
    const results = await PAMAProfile.findAll({
      include: [
        {
          model: Patient,
          attributes: ['firstName', 'middleName']
        }
      ]
    })
    return results
  }

  async findById (id: string): Promise<PAMAInterface | null> {
    const results = await PAMAProfile.findOne({
      where: {
        id
      }
    })

    return results
  }
}
