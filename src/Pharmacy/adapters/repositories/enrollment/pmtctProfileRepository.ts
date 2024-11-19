/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type IPMTCTProfileRepository } from '../../application/interfaces/IPMTCTProfileRepository'
import { type PMTCTProfileEntity } from '../../domain/entities/PMTCTProfileEntity'
import { Patient } from '../../domain/models/patients.models'
import { PMTCTProfile } from '../../domain/models/pmtct/pmtctProfile.model'

export class PMTCTProfileRepository implements IPMTCTProfileRepository {
  async create (data: PMTCTProfileEntity): Promise<PMTCTProfileEntity> {
    const results: PMTCTProfileEntity = await PMTCTProfile.create(data)
    return results
  }

  async find (): Promise<PMTCTProfileEntity[]> {
    const results = await PMTCTProfile.findAll({
      include: [
        {
          model: Patient,
          attributes: ['firstName', 'middleName', 'dob']
        }
      ]
    })
    return results
  }

  async findById (id: string): Promise<PMTCTProfileEntity | null> {
    const results = await PMTCTProfile.findOne({
      where: {
        id
      }
    })

    return results
  }
}
