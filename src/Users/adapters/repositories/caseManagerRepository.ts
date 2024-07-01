/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { CaseManagerInterface } from 'otz-types'
import { type ICaseManagerRepository } from '../../application/interfaces/ICaseManagerRepository'
import CaseManager from '../../domain/models/casemanager.model'
import { Patient } from '../../domain/models/patients.models'
import { User } from '../../domain/models/user.model'

export class CaseManagerRepository implements ICaseManagerRepository {
  async create (data: CaseManagerInterface): Promise<CaseManagerInterface> {
    // const {
    //   firstName,
    //   middleName,
    //   lastName,
    //   dob,
    //   phoneNo,
    //   sex,
    //   idNo,
    //   email,
    //   countyID,
    //   password
    // } = data

    const results: CaseManagerInterface = await CaseManager.create(data)
    // const caregiverEntity: CaregiverEntity = {
    //   id: results.id,
    //   firstName: results.firstName,
    //   middleName,
    //   sex,
    //   countyID,
    //   phoneNo,
    //   idNo,
    //   lastName: '',
    //   dob: '',
    //   email: '',
    //   password: ''
    // }
    return results
  }

  async find (): Promise<CaseManagerInterface[]> {
    const results = await CaseManager.findAll({
      include: [
        {
          model: Patient,
          attributes: ['firstName', 'middleName']
        },
        {
          model: User,
          attributes: ['firstName', 'middleName', 'phoneNo']
        }
      ]
    })
    return results
  }

  async findById (id: string): Promise<CaseManagerInterface | null> {
    const results = await CaseManager.findOne({
      where: {
        id
      }
    })

    return results
  }
}
