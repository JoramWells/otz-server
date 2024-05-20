/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type IOTZRepository } from '../../application/interfaces/IOTZRepository'
import { type OTZEntity } from '../../domain/entities/OTZEntity'
import { OTZ } from '../../domain/models/enrollment/otz.model'
import { Patient } from '../../domain/models/patients.models'

export class OTZRepository implements IOTZRepository {
  async create (data: OTZEntity): Promise<OTZEntity> {
    const results: OTZEntity = await OTZ.create(data)
    return results
  }

  async find (): Promise<OTZEntity[]> {
    const results = await OTZ.findAll({
      include: [
        {
          model: Patient,
          attributes: ['firstName', 'middleName']
        }
      ]
    })
    return results
  }

  async findById (id: string): Promise<OTZEntity | null> {
    const results = await OTZ.findOne({
      where: {
        id
      }
    })

    return results
  }
}
