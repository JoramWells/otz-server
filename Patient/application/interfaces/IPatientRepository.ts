import { Patient } from '../../domain/entities/Patient'

export interface IPatientRepository {
  create(data: Patient): Promise<Patient>;
  find():Promise<Patient>
}