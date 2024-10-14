import { PatientSessionLogInterface } from "otz-types";
import { IPatientSessionRepository } from "../interfaces/IPatientSessionRepository";
import { IPatientSessionInteractor } from "../interfaces/IPatientSessionInteractor";

export class PatientSessionLogInteractor implements IPatientSessionInteractor {
  private readonly repository: IPatientSessionRepository;

  constructor(repository: IPatientSessionRepository) {
    this.repository = repository;
  }

  async editPatientSession(
    data: PatientSessionLogInterface
  ): Promise<PatientSessionLogInterface | null> {
    return await this.repository.edit(data);
  }



  async getPatientSessionById(id: string): Promise<PatientSessionLogInterface | null> {
    return await this.repository.findById(id);
  }


  async createPatientSession(
    patientData: PatientSessionLogInterface,
  ): Promise<string | null> {
    return await this.repository.create(patientData );
  }

  async getAllPatientSessions(): Promise<PatientSessionLogInterface[]> {
    return await this.repository.find();
  }

 

  //
  async deletePatientSession(id: string): Promise<number | null> {
    return await this.repository.delete(id);
  }


}
