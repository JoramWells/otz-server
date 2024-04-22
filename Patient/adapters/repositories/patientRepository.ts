/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { type IPatientRepository } from '../../application/interfaces/IPatientRepository'
import { type PatientEntity } from '../../domain/entities/PatientEntity'
import { Hospital } from '../../domain/models/hospital/hospital.model'
import { Patient, type PatientAttributes } from '../../domain/models/patients.models'
import { School } from '../../domain/models/school/school.model'

export class PatientRepository implements IPatientRepository {
  async create (data: PatientEntity): Promise<PatientEntity> {
    const { firstName, middleName, lastName, dob, phoneNo, cccNo, dateConfirmedPositive, ageAtReporting, populationType, occupationID, sex, hospitalID, initialRegimen, schoolID, idNo } = data
    const results: PatientAttributes = await Patient.create({
      firstName,
      middleName,
      lastName,
      dob,
      phoneNo,
      cccNo,
      dateConfirmedPositive,
      ageAtReporting,
      populationType,
      occupationID,
      sex,
      hospitalID,
      initialRegimen,
      schoolID,
      idNo
    })
    const patientEntity: PatientEntity = {
      id: results.id,
      firstName: results.firstName,
      middleName,
      sex,
      occupationID,
      phoneNo,
      idNo
    }

    return patientEntity
  }

  async find (): Promise<PatientEntity[]> {
    const results = await Patient.findAll({
      include: [
        { model: School, attributes: ['schoolName'] },
        {
          model: Hospital,
          attributes: ['hospitalName']
        }
      //   {
      //     model: ViralLoad,
      //     attributes: [
      //       'id',
      //       'dateOfNextVL',
      //       'vlResults',
      //       'isValid',
      //       'dateOfCurrentVL'
      //     ]
      //   }
      ]
    })
    return results
  }

  async findById (id: string): Promise<PatientEntity> {
    const results: Patient | null = await Patient.findOne({
      where: {
        id
      }
    })

    const patientResults: PatientEntity = {
      firstName: results?.firstName,
      middleName: results?.middleName,
      sex: results?.sex,
      phoneNo: results?.phoneNo,
      idNo: results?.idNo,
      occupationID: results?.occupationID
    }

    return patientResults
  }
}
