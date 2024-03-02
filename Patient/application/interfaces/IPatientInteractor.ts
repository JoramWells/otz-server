import { Patient } from "../../domain/entities/Patient";

export interface IPatientInteractor{
    createPatient(patientData: any):Promise<Patient>;
    getAllPatients():Promise<Patient>
}