/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { NextOfKinInterface } from 'otz-types'
import { type INextOfKinRepository } from '../../application/interfaces/INextOfKinRepository'
import { NextOfKin } from '../../domain/models/nextOfKin.model'
import { Patient } from '../../domain/models/patients.models'

export class NextOfKinRepository implements INextOfKinRepository {
  async create (data: NextOfKinInterface): Promise<NextOfKinInterface> {
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

    const results: NextOfKinInterface = await NextOfKin.create(data)
    // const NextOfKinInterface: NextOfKinInterface = {
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

  async find (): Promise<NextOfKinInterface[]> {
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

  async findById (id: string): Promise<NextOfKinInterface[] | null> {
    const results = await NextOfKin.findAll({
      where: {
        patientID: id
      }
    })

    return results
  }
}
