// import { type Patient } from '../../domain/entities/PatientEntity'
import { CaseManagerInterface } from 'otz-types'
import { ICALHIVRepository } from '../interfaces/ICALHIVRepository';
import { ICALHIVInteractor } from '../interfaces/ICALHIVInteractor';


export class CALHIVInteractor implements ICALHIVInteractor {
  private readonly repository: ICALHIVRepository;

  constructor(repository: ICALHIVRepository) {
    this.repository = repository;
  }

  async getCalHIVByPatientId(
    id: string
  ): Promise<CaseManagerInterface | null | undefined> {
    return await this.repository.findById(id);
  }

  async getCalHIVById(id: string): Promise<CaseManagerInterface | null> {
    return await this.repository.findById(id);
  }

  async createCalHIV(
    patientData: CaseManagerInterface
  ): Promise<CaseManagerInterface> {
    return await this.repository.create(patientData);
  }

  async getAllCalHIVs(hospitalID: string): Promise<CaseManagerInterface[] | undefined | null> {
    return await this.repository.find(hospitalID);
  }
}
