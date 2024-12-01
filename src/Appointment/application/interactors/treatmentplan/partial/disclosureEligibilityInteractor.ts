import { ChildCaregiverReadinessAttributes, ChildDisclosureEligibilityAttributes } from "otz-types";
import { IDisclosureEligibilityInteractor } from "../../../interfaces/disclosure/partial/IDisclosureEligibilityInteractor";
import { IDisclosureEligibilityRepository } from "../../../interfaces/disclosure/partial/IDisclosureEligibilityRepository";


export class DisclosureEligibilityInteractor
  implements IDisclosureEligibilityInteractor
{
  private readonly repository: IDisclosureEligibilityRepository;

  constructor(repository: IDisclosureEligibilityRepository) {
    this.repository = repository;
  }
  // async getDailyPillUptakeCount(){
  //   return await this.repository.count()
  // };

  async getAllDisclosureEligibility(
    hospitalID: string
  ): Promise<ChildDisclosureEligibilityAttributes[] | null> {
    return await this.repository.find(hospitalID);
  }

  async getDisclosureEligibilityById(
    id: string
  ): Promise<ChildDisclosureEligibilityAttributes | null | undefined> {
    return await this.repository.findById(id);
  }

  async getDisclosureEligibilityByPatientId(
    id: string
  ): Promise<ChildDisclosureEligibilityAttributes | null | undefined> {
    return await this.repository.findByPatientId(id);
  }

  async createDisclosureEligibility(
    patientData: ChildDisclosureEligibilityAttributes,
    readiness: ChildCaregiverReadinessAttributes
  ): Promise<ChildDisclosureEligibilityAttributes> {
    return await this.repository.create(patientData, readiness);
  }

  async getAllDisclosureEligibilityByVisitId(hospitalID: string): Promise<
    ChildDisclosureEligibilityAttributes[]
  > {
    return await this.repository.find(hospitalID);
  }
}
