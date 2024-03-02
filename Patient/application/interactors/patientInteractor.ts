import { Patient } from "../../domain/entities/Patient";
import { IPatientInteractor } from "../interfaces/IPatientInteractor";
import { IPatientRepository } from "../interfaces/IPatientRepository";

export class PatientInteractor implements IPatientInteractor{

    private repository: IPatientRepository

    constructor(repository: IPatientRepository){
        this.repository = repository
    }
    getPatientById(id: string): Promise<Patient> {
        return this.repository.findById(id)
    }
    createPatient(patientData: any): Promise<Patient> {
        return this.repository.create(patientData)
    }


    getAllPatients() {
        return this.repository.find()
    }
    
}