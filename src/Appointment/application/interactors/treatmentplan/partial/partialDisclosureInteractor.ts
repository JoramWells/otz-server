// import { type Patient } from '../../domain/entities/PatientEntity'
import { PartialDisclosureEntity } from '../../../../domain/entities/treatmentplan/disclosure/partial/PartialDisclosureEntity';
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

  async getAllPartialDisclosure(): Promise<PartialDisclosureEntity[]> {
    return await this.repository.find()
  }

  async getPartialDisclosureById(id: string): Promise<PartialDisclosureEntity | null> {
    return await this.repository.findById(id);
  }

  async createPartialDisclosure(patientData: PartialDisclosureEntity): Promise<PartialDisclosureEntity> {
    return await this.repository.create(patientData);
  }

  async getAllPartialDisclosureByVisitId(): Promise<PartialDisclosureEntity[]> {
    return await this.repository.find();
  }
}
