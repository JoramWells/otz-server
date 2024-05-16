/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
import { type IPAMARepository } from '../../../application/interfaces/enrollment/IPAMARepository'
import { type PAMAProfileEntity } from '../../../domain/entities/PAMAProfileEntity'
import { PAMAProfile } from '../../../domain/models/pama/pamaProfile.models'
import { Patient } from '../../../domain/models/patients.models'

export class PAMARepository implements IPAMARepository {
  async create (data: PAMAProfileEntity): Promise<PAMAProfileEntity> {
    const results: PAMAProfileEntity = await PAMAProfile.create(data)
    return results
  }

  async find (): Promise<PAMAProfileEntity[]> {
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

  async findById (id: string): Promise<PAMAProfileEntity | null> {
    const results = await PAMAProfile.findOne({
      where: {
        id
      }
    })

    return results
  }
}
