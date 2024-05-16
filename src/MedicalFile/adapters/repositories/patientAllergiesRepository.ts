/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
import { type IPatientAllergiesRepository } from '../../application/interfaces/IPatientAllergiesRepository'
import { type PatientAllergiesEntity } from '../../domain/entities/PatientAllergiesEntity'
import { PatientAllergies } from '../../domain/models/patientAllergies.model'

export class PatientAllergiesRepository implements IPatientAllergiesRepository {
  async create (data: PatientAllergiesEntity): Promise<PatientAllergiesEntity> {
    const results: PatientAllergiesEntity = await PatientAllergies.create(data)

    return results
  }

  async find (): Promise<PatientAllergiesEntity[]> {
    const results = await PatientAllergies.findAll({})
    return results
  }

  async findById (id: string): Promise<PatientAllergiesEntity | null> {
    const results = await PatientAllergies.findOne({
      where: {
        patientID: id
      }
    })

    return results
  }
}
