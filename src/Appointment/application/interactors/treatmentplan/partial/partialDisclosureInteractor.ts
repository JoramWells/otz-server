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

  async getAllPartialDisclosure(): Promise<PartialDisclosureAttributes[]> {
    return await this.repository.find()
  }

  async getPartialDisclosureById(id: string): Promise<PartialDisclosureAttributes | null> {
    return await this.repository.findById(id);
  }

  async createPartialDisclosure(patientData: PartialDisclosureAttributes): Promise<PartialDisclosureAttributes> {
    return await this.repository.create(patientData);
  }

  async getAllPartialDisclosureByVisitId(): Promise<PartialDisclosureAttributes[]> {
    return await this.repository.find();
  }
}
