/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type IPatientVisitsRepository } from '../../application/interfaces/IPatientVisitsRepository'
import { type PatientVisitsEntity } from '../../domain/entities/PatientVisitsEntity'
import { PatientVisits } from '../../domain/models/patientVisits.model'
import { Patient } from '../../domain/models/patients.models'

export class PatientVisitRepository implements IPatientVisitsRepository {
  async create (data: PatientVisitsEntity): Promise<PatientVisitsEntity> {
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

    const results: PatientVisitsEntity = await PatientVisits.create(data)
    // const PatientVisitsEntity: PatientVisitsEntity = {
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

  async find (): Promise<PatientVisitsEntity[]> {
    const results = await PatientVisits.findAll({
      include: [
        {
          model: Patient,
          attributes: ['firstName', 'middleName']
        }
      ]
    })
    return results
  }

  async findById (id: string): Promise<PatientVisitsEntity | null> {
    const results = await PatientVisits.findAll({
      where: {
        patientID: id
      }
    })

    return results
  }
}
