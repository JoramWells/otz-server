// import { type Patient } from '../../domain/entities/PatientAttributes'
import { NextOfKinInterface, PatientAttributes } from 'otz-types';
import { type IPatientInteractor } from '../interfaces/IPatientInteractor'
import { type IPatientRepository } from '../interfaces/IPatientRepository'

export class PatientInteractor implements IPatientInteractor {
  private readonly repository: IPatientRepository;

  constructor(repository: IPatientRepository) {
    this.repository = repository;
  }
  async markAsImportant (id: string, isImportant: boolean) :Promise<string | null>{
    return await this.repository.important(id, isImportant)
  }

  async editPatient(data: PatientAttributes): Promise<PatientAttributes | null> {
    return await this.repository.edit(data);
  }

  async findAllPMTCTPatients(): Promise<PatientAttributes[]> {
    return await this.repository.findAllPMTCTPatients();
  }

  async getPatientById(id: string): Promise<PatientAttributes | null> {
    return await this.repository.findById(id);
  }

  async createPatient(
    patientData: PatientAttributes,
    nextOfKinData: NextOfKinInterface
  ): Promise<string | null> {
    return await this.repository.create(patientData, nextOfKinData);
  }

  async getAllPatients(): Promise<PatientAttributes[]> {
    return await this.repository.find();
  }

  async getAllPMTCTPatients(): Promise<PatientAttributes[]> {
    return await this.repository.findAllPMTCTPatients();
  }

  async findAllOTZPatients(): Promise<PatientAttributes[]> {
    return await this.repository.findOTZ();
  }

  //
  async login(firstName: string, password: string): Promise<PatientAttributes | null> {
    return await this.repository.login(firstName, password);
  }
}
