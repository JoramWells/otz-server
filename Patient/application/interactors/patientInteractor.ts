import { IPatientInteractor } from "../interfaces/IPatientInteractor";
import { IPatientRepository } from "../interfaces/IPatientRepository";

export class PatientInteractor implements IPatientInteractor{

    private repository: IPatientRepository

    constructor(repository: IPatientRepository){
        this.repository = repository
    }


    createPatient(patientData: any) {
        return this.repository.create(patientData)
    }
    getAllPatients() {
        return this.repository.find()
    }
    
}