// import { type Patient } from '../../domain/entities/PatientEntity'
import { PatientVisitsInterface } from "otz-types";
import { type IPatientVisitInteractor } from "../interfaces/IPatientVisitInteractor";
import { type IPatientVisitsRepository } from "../interfaces/IPatientVisitsRepository";
import { PatientVisitResponseInterface } from "../../entities/PatientVisitResponseInterface";

export class PatientVisitInteractor implements IPatientVisitInteractor {
  private readonly repository: IPatientVisitsRepository;

  constructor(repository: IPatientVisitsRepository) {
    this.repository = repository;
  }

  async getHistoryPatientVisitById(
    id: string
  ): Promise<PatientVisitsInterface[] | null> {
    return await this.repository.findHistoryById(id);
  }

  async getPatientVisitById(
    id: string
  ): Promise<PatientVisitsInterface | null> {
    return await this.repository.findById(id);
  }

  async getUserActivitiesCount(
    id: string
  ): Promise<PatientVisitsInterface[] | null> {
    return await this.repository.findUserActivitiesCount(id);
  }

  async getUserPatientCount(
    id: string
  ): Promise<PatientVisitsInterface[] | null> {
    return await this.repository.findUserPatientCount(id);
  }

  async getPatientVisitByUserId(
    id: string
  ): Promise<PatientVisitsInterface[] | null> {
    return await this.repository.findPatientVisitByUserId(id);
  }

  async createPatientVisit(
    patientData: PatientVisitsInterface
  ): Promise<PatientVisitsInterface | null> {
    return await this.repository.create(patientData);
  }

  async getAllPatientVisits(
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ): Promise<PatientVisitResponseInterface | null | undefined> {
    return await this.repository.find(hospitalID, page, pageSize, searchQuery);
  }
}
