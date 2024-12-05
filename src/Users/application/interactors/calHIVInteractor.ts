// import { type Patient } from '../../domain/entities/PatientEntity'
import { CALHIVInterface } from "otz-types";
import { ICALHIVRepository } from "../interfaces/ICALHIVRepository";
import { ICALHIVInteractor } from "../interfaces/ICALHIVInteractor";

export class CALHIVInteractor implements ICALHIVInteractor {
  private readonly repository: ICALHIVRepository;

  constructor(repository: ICALHIVRepository) {
    this.repository = repository;
  }

  async getCalHIVByHospitalId(
    id: string
  ): Promise<CALHIVInterface | null | undefined> {
    return await this.repository.findByHospitalId(id);
  }

  async getCalHIVById(id: string): Promise<CALHIVInterface | null | undefined> {
    return await this.repository.findByHospitalId(id);
  }

  async createCalHIV(patientData: CALHIVInterface): Promise<CALHIVInterface> {
    return await this.repository.create(patientData);
  }

  async getAllCalHIVs(
    hospitalID: string
  ): Promise<CALHIVInterface[] | undefined | null> {
    return await this.repository.find(hospitalID);
  }
}
