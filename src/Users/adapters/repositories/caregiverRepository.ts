/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type ICaregiverRepository } from '../../application/interfaces/ICaregiverRepository'
import { type CaregiverEntity } from '../../domain/entities/CaregiverEntity'
import { Caregiver } from '../../domain/models/caregiver.model'
import { Patient } from '../../domain/models/patients.models'

export class CaregiverRepository implements ICaregiverRepository {
  async create (data: CaregiverEntity): Promise<CaregiverEntity> {
    const results: CaregiverEntity = await Caregiver.create(data)

    return results
  }

  async find (): Promise<CaregiverEntity[]> {
    const results = await Caregiver.findAll({
      include: [
        {
          model: Patient,
          attributes: ['firstName', 'middleName']
        }
      ]
    })
    return results
  }

  async findById (id: string): Promise<CaregiverEntity[] | null> {
    const results = await Caregiver.findAll({
      where: {
        patientID: id
      }
    })

    return results
  }
}
