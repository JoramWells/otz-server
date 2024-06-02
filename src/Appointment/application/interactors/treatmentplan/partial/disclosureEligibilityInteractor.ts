import { ChildCaregiverReadinessEntity } from "../../../../domain/entities/treatmentplan/disclosure/partial/ChildCaregiverReadinessEntity";
import { DisclosureEligibilityEntity } from "../../../../domain/entities/treatmentplan/disclosure/partial/DisclosureEligibilityEntity";
import { IDisclosureEligibilityInteractor } from "../../../interfaces/disclosure/partial/IDisclosureEligibilityInteractor";
import { IDisclosureEligibilityRepository } from "../../../interfaces/disclosure/partial/IDisclosureEligibilityRepository";


export class DisclosureEligibilityInteractor implements IDisclosureEligibilityInteractor {
  private readonly repository: IDisclosureEligibilityRepository;

  constructor(repository: IDisclosureEligibilityRepository) {
    this.repository = repository;
  }
  // async getDailyPillUptakeCount(){
  //   return await this.repository.count()
  // };

  async getAllDisclosureEligibility(): Promise<DisclosureEligibilityEntity[]> {
    return await this.repository.find()
  }

  async getDisclosureEligibilityById(id: string): Promise<DisclosureEligibilityEntity | null> {
    return await this.repository.findById(id);
  }

  async createDisclosureEligibility(patientData: DisclosureEligibilityEntity, readiness: ChildCaregiverReadinessEntity): Promise<DisclosureEligibilityEntity> {
    return await this.repository.create(patientData, readiness);
  }

  async getAllDisclosureEligibilityByVisitId(): Promise<DisclosureEligibilityEntity[]> {
    return await this.repository.find();
  }
}
