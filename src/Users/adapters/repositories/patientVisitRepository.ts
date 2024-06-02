/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type IPatientVisitsRepository } from '../../application/interfaces/IPatientVisitsRepository'
import { type PatientVisitsEntity } from '../../domain/entities/PatientVisitsEntity'
import { PatientVisits } from '../../domain/models/patientVisits.model'
import { Patient } from '../../domain/models/patients.models'

export class PatientVisitRepository implements IPatientVisitsRepository {
  async create (data: PatientVisitsEntity): Promise<PatientVisitsEntity> {
    const results: PatientVisitsEntity = await PatientVisits.create(data)

    return results
  }

  async find (): Promise<PatientVisitsEntity[]> {
    const results = await PatientVisits.findAll({
      include: [
        {
          model: Patient,
          attributes: ['id', 'firstName', 'middleName']
        }
      ]
    })
    return results
  }

  async findById (id: string): Promise<PatientVisitsEntity | null> {
    const results = await PatientVisits.findOne({
      where: {
        patientID: id
      }
    })

    return results
  }

  async findHistoryById (id: string): Promise<PatientVisitsEntity[] | null> {
    const results = await PatientVisits.findAll({
      where: {
        patientID: id
      }
    })

    return results
  }
}
