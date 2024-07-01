/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { CaregiverInterface } from 'otz-types'
import { type ICaregiverRepository } from '../../application/interfaces/ICaregiverRepository'
import { Caregiver } from '../../domain/models/caregiver.model'
import { Patient } from '../../domain/models/patients.models'

export class CaregiverRepository implements ICaregiverRepository {
  async create (data: CaregiverInterface): Promise<CaregiverInterface> {
    const results: CaregiverInterface = await Caregiver.create(data)

    return results
  }

  async find (): Promise<CaregiverInterface[]> {
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

  async findById (id: string): Promise<CaregiverInterface[] | null> {
    const results = await Caregiver.findAll({
      where: {
        patientID: id
      }
    })

    return results
  }
}
