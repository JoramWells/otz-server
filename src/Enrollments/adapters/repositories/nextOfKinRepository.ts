/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type INextOfKinRepository } from '../../application/interfaces/INextOfKinRepository'
import { type NextOfKinEntity } from '../../domain/entities/NextOfKinEntity'
import { NextOfKin } from '../../domain/models/nextOfKin.model'
import { Patient } from '../../domain/models/patients.models'

export class NextOfKinRepository implements INextOfKinRepository {
  async create (data: NextOfKinEntity): Promise<NextOfKinEntity> {
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

    const results: NextOfKinEntity = await NextOfKin.create(data)
    // const NextOfKinEntity: NextOfKinEntity = {
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

  async find (): Promise<NextOfKinEntity[]> {
    const results = await NextOfKin.findAll({
      include: [
        {
          model: Patient,
          attributes: ['firstName', 'middleName']
        }
      ]
    })
    return results
  }

  async findById (id: string): Promise<NextOfKinEntity[] | null> {
    const results = await NextOfKin.findAll({
      where: {
        patientID: id
      }
    })

    return results
  }
}
