// import { type Patient } from '../../domain/entities/PatientEntity'
import { CaseManagerInterface } from 'otz-types'
import { type ICaseManagerInteractor } from '../interfaces/ICaseManagerInteractor'
import { type ICaseManagerRepository } from '../interfaces/ICaseManagerRepository'

export class CaseManagerInteractor implements ICaseManagerInteractor {
  private readonly repository: ICaseManagerRepository;

  constructor(repository: ICaseManagerRepository) {
    this.repository = repository;
  }

  async getCaseManagerByPatientId(
    id: string
  ): Promise<CaseManagerInterface | null | undefined> {
    return await this.repository.findByPatientId(id);
  }

  async getCaseManagerById(id: string): Promise<CaseManagerInterface | null> {
    return await this.repository.findById(id);
  }

  async createCaseManager(
    patientData: CaseManagerInterface
  ): Promise<CaseManagerInterface> {
    return await this.repository.create(patientData);
  }

  async getAllCaseManagers(hospitalID: string): Promise<CaseManagerInterface[] | undefined | null> {
    return await this.repository.find(hospitalID);
  }
}
