import { AppointmentAttributes, PrescriptionInterface } from "otz-types";
import { type IPrescriptionInteractor } from "../interfaces/art/IPrescriptionInteractor";
import { type IPrescriptionRepository } from "../interfaces/art/IPrescriptionRepository";
import { PrescriptionResponseInterface } from "../../domain/models/art/prescription.model";

export class PrescriptionInteractor implements IPrescriptionInteractor {
  private readonly repository: IPrescriptionRepository;

  constructor(repository: IPrescriptionRepository) {
    this.repository = repository;
  }

  async getFacilityAdherence(): Promise<string | number> {
    return await this.repository.findFacilityAdherence();
  }

  async getPrescriptionById(id: string): Promise<PrescriptionInterface | null> {
    return await this.repository.findById(id);
  }

  //
  async getPrescriptionByVisitId(
    id: string
  ): Promise<PrescriptionInterface | null | undefined> {
    return await this.repository.findByVisitId(id);
  }

  async getAllPrescriptionByPatientId(
    id: string
  ): Promise<PrescriptionInterface[] | null> {
    return await this.repository.findAllByPatientId(id);
  }

  async getPrescriptionDetails(
    id: string
  ): Promise<PrescriptionInterface | null> {
    return await this.repository.findDetails(id);
  }

  async createPrescription(
    data: PrescriptionInterface,
    appointmentInput: AppointmentAttributes
  ): Promise<PrescriptionInterface | null> {
    return await this.repository.create(data, appointmentInput);
  }

  async editPrescription(
    data: PrescriptionInterface
  ): Promise<PrescriptionInterface | null> {
    return await this.repository.edit(data);
  }

  async getAllPrescriptions(
    dateQuery: string,
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string,
    frequency: string,
    line: string,
    regimen: string,
    status: string
  ): Promise<PrescriptionResponseInterface | null | undefined> {
    return await this.repository.find(
      dateQuery,
      hospitalID,
      page,
      pageSize,
      searchQuery,
      frequency,
      line,
      regimen,
      status
    );
  }

  async getAllAdherence(): Promise<PrescriptionInterface[]> {
    return await this.repository.findAllAdherence();
  }

  async findRecentRecentByPatientID(id: string) {
    return await this.repository.getRecentPrescriptionByPatientID(id);
  }
}
