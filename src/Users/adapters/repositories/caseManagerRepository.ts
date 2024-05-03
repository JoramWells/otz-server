/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type ICaseManagerRepository } from '../../application/interfaces/ICaseManagerRepository'
import { type CaseManagerEntity } from '../../domain/entities/CaseManagerEntity'
import CaseManager from '../../domain/models/casemanager.model'
import { Patient } from '../../domain/models/patients.models'

export class CaseManagerRepository implements ICaseManagerRepository {
  async create (data: CaseManagerEntity): Promise<CaseManagerEntity> {
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

    const results: CaseManagerEntity = await CaseManager.create(data)
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

  async find (): Promise<CaseManagerEntity[]> {
    const results = await CaseManager.findAll({
      include: [
        {
          model: Patient,
          attributes: ['firstName', 'middleName']
        }
      ]
    })
    return results
  }

  async findById (id: string): Promise<CaseManagerEntity | null> {
    const results = await CaseManager.findOne({
      where: {
        id
      }
    })

    return results
  }
}
