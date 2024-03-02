import { IPatientInteractor } from "../../application/interfaces/IPatientInteractor";
import { IPatientRepository } from "../../application/interfaces/IPatientRepository";
import { Patient } from "../../domain/entities/Patient";
const PatientDetails = require('../../domain/models/patients.models')

export class PatientRepository implements IPatientRepository {
  async create(data: Patient): Promise<Patient> {
    return await PatientDetails.create(data)
  }
  async find(): Promise<Patient> {
    return await PatientDetails.findAll({})
  }
}