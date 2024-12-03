// import { type Patient } from '../../domain/entities/PatientEntity'
import { PartialDisclosureAttributes } from 'otz-types';
import { IPartialDisclosureInteractor } from '../../../interfaces/disclosure/partial/IPartialDisclosureInteractor';
import { IPartialDisclosureRepository } from '../../../interfaces/disclosure/partial/IPartialDisclosureRepository';


export class PartialDisclosureInteractor implements IPartialDisclosureInteractor {
  private readonly repository: IPartialDisclosureRepository;

  constructor(repository: IPartialDisclosureRepository) {
    this.repository = repository;
  }
  // async getDailyPillUptakeCount(){
  //   return await this.repository.count()
  // };

  async getAllPartialDisclosure(
    hospitalID: string
  ): Promise<PartialDisclosureAttributes[] | null> {
    return await this.repository.find(hospitalID);
  }

  async getPartialDisclosureById(
    id: string
  ): Promise<PartialDisclosureAttributes | null> {
    return await this.repository.findById(id);
  }

  async getPartialDisclosureByPatientId(
    id: string
  ): Promise<PartialDisclosureAttributes | null | undefined> {
    return await this.repository.findByPatientId(id);
  }

  async createPartialDisclosure(
    patientData: PartialDisclosureAttributes
  ): Promise<PartialDisclosureAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllPartialDisclosureByVisitId(): Promise<
    PartialDisclosureAttributes[]
  > {
    return await this.repository.find();
  }
}
