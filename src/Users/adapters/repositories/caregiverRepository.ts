/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type ICaregiverRepository } from '../../application/interfaces/ICaregiverRepository'
import { type CaregiverEntity } from '../../domain/entities/CaregiverEntity'
import { Caregiver } from '../../domain/models/caregiver.model'
import { Patient } from '../../domain/models/patients.models'

export class CaregiverRepository implements ICaregiverRepository {
  async create (data: CaregiverEntity): Promise<CaregiverEntity> {
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

    const results: CaregiverEntity = await Caregiver.create(data)
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
