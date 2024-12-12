// import { type Patient } from '../../domain/entities/PatientEntity'
import { PartialDisclosureAttributes } from "otz-types";
import { IPartialDisclosureInteractor } from "../../../interfaces/disclosure/partial/IPartialDisclosureInteractor";
import { IPartialDisclosureRepository } from "../../../interfaces/disclosure/partial/IPartialDisclosureRepository";
import { PartialDisclosureResponseInterface } from "../../../../entities/PartialDisclosureResponseInterface";

export class PartialDisclosureInteractor
  implements IPartialDisclosureInteractor
{
  private readonly repository: IPartialDisclosureRepository;

  constructor(repository: IPartialDisclosureRepository) {
    this.repository = repository;
  }
  // async getDailyPillUptakeCount(){
  //   return await this.repository.count()
  // };

  async getAllPartialDisclosure(
    hospitalID: string | undefined,
    page: string | undefined,
    pageSize: string | undefined,
    searchQuery: string
  ): Promise<PartialDisclosureResponseInterface | null | undefined> {
    return await this.repository.find(hospitalID, page, pageSize, searchQuery);
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

  async getAllPartialDisclosureByVisitId(id: string): Promise<
    PartialDisclosureAttributes[] | null
  > {
    return await this.repository.findAllByVisitId(id);
  }

  //
  async getPartialDisclosureScoreCategory(
    hospitalID: string | undefined
  ): Promise<PartialDisclosureAttributes[] | undefined | null> {
    return await this.repository.findPartialDisclosureScoreCategory(hospitalID);
  }
}
