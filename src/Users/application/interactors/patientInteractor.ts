// import { type Patient } from '../../domain/entities/PatientAttributes'
import { NextOfKinInterface, PatientAttributes } from 'otz-types';
import { type IPatientInteractor } from '../interfaces/IPatientInteractor'
import { type IPatientRepository } from '../interfaces/IPatientRepository'
import { PatientResponseInterface } from '../../domain/models/patients.models';

export class PatientInteractor implements IPatientInteractor {
  private readonly repository: IPatientRepository;

  constructor(repository: IPatientRepository) {
    this.repository = repository;
  }
  async getImportantPatient(limit: number): Promise<PatientAttributes[]> {
    return await this.repository.findImportant(limit);
  }
  async markAsImportant(
    id: string,
    isImportant: boolean
  ): Promise<string | null> {
    return await this.repository.important(id, isImportant);
  }

  async editPatient(
    data: PatientAttributes
  ): Promise<PatientAttributes | null> {
    return await this.repository.edit(data);
  }

  async findAllPMTCTPatients(): Promise<PatientAttributes[]> {
    return await this.repository.findAllPMTCTPatients();
  }

  async getPatientById(id: string): Promise<PatientAttributes | null> {
    return await this.repository.findById(id);
  }

  async getPatientByUserId(id: string): Promise<PatientAttributes | null> {
    return await this.repository.findPatientByUserId(id);
  }

  async updateAvatar(
    id: string,
    avatar: string
  ): Promise<PatientAttributes | null> {
    return await this.repository.editAvatar(id, avatar);
  }

  async updatePatientPassword(
    id: string,
    password: string
  ): Promise<PatientAttributes | null> {
    return await this.repository.editAvatar(id, password);
  }

  async updatePatientUsername(
    id: string,
    username: string
  ): Promise<PatientAttributes | null> {
    return await this.repository.editAvatar(id, username);
  }

  async createPatient(
    patientData: PatientAttributes,
    nextOfKinData: NextOfKinInterface
  ): Promise<string | null> {
    return await this.repository.create(patientData, nextOfKinData);
  }

  async getAllPatients(
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string,
    calHIVQuery: string
  ): Promise<PatientResponseInterface | null | undefined> {
    console.log(calHIVQuery, 'interactor')
    return await this.repository.find(
      hospitalID,
      page,
      pageSize,
      searchQuery,
      calHIVQuery
    );
  }

  async getAllPatientUsers(): Promise<PatientAttributes[]> {
    return await this.repository.findUsers();
  }

  async getAllPMTCTPatients(): Promise<PatientAttributes[]> {
    return await this.repository.findAllPMTCTPatients();
  }

  async findAllOTZPatients(): Promise<PatientAttributes[]> {
    return await this.repository.findOTZ();
  }

  //
  async deletePatient(id: string): Promise<number | null> {
    return await this.repository.delete(id);
  }

  //
  async login(
    cccNo: string,
    password: string
  ): Promise<PatientAttributes | null> {
    return await this.repository.login(cccNo, password);
  }
}
