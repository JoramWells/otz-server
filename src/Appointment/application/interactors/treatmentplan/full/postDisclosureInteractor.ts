import { ExecuteDisclosureAttributes, PostDisclosureAttributes } from "otz-types";
import { IPostDisclosureInteractor } from "../../../interfaces/disclosure/full/IPostDisclosureInteractor";
import { IPostDisclosureRepository } from "../../../interfaces/disclosure/full/IPostDisclosureRepository";


export class PostDisclosureInteractor implements IPostDisclosureInteractor {
  private readonly repository: IPostDisclosureRepository;

  constructor(repository: IPostDisclosureRepository) {
    this.repository = repository;
  }
  // async getDailyPillUptakeCount(){
  //   return await this.repository.count()
  // };

  async getAllPostDisclosure(
    hospitalID: string
  ): Promise<PostDisclosureAttributes[] | null> {
    return await this.repository.find(hospitalID);
  }

  async getPostDisclosureById(
    id: string
  ): Promise<PostDisclosureAttributes | null> {
    return await this.repository.findById(id);
  }

  //
  async getPostDisclosureByPatientId(
    patientID: string
  ): Promise<PostDisclosureAttributes | null> {
    return await this.repository.findByPatientId(patientID);
  }

  async createPostDisclosure(
    data: PostDisclosureAttributes
  ): Promise<PostDisclosureAttributes> {
    return await this.repository.create(data);
  }

  async getAllPostDisclosureByVisitId(): Promise<PostDisclosureAttributes[]> {
    return await this.repository.find();
  }
}
