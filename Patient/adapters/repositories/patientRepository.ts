/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type IPatientRepository } from '../../application/interfaces/IPatientRepository'
import { type Patient } from '../../domain/entities/Patient'
const PatientDetails = require('../../domain/models/patients.models')
const School = require('../../domain/models/school/school.model')
const Hospital = require('../../domain/models/hospital/hospital.model')
const ViralLoad = require('../../domain/models/vl/viralLoadTests.model')

export class PatientRepository implements IPatientRepository {
  async create (data: Patient): Promise<Patient> {
    const results = await PatientDetails.create(data)
    return results
  }

  async find (): Promise<Patient[]> {
    const results = await PatientDetails.findAll({
      include: [
        { model: School, attributes: ['schoolName'] },
        {
          model: Hospital,
          attributes: ['hospitalName']
        },
        {
          model: ViralLoad,
          attributes: [
            'id',
            'dateOfNextVL',
            'vlResults',
            'isValid',
            'dateOfCurrentVL'
          ]
        }
      ]
    })
    return results
  }

  async findById (id: string): Promise<Patient> {
    const results = await PatientDetails.findOne({
      where: {
        id
      }
    })
    return results
  }
}
