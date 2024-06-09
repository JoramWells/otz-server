import { ExecuteDisclosureEntity } from "../../../../domain/entities/treatmentplan/disclosure/full/ExecuteDisclosureEntity";
import { PostDisclosureEntity } from "../../../../domain/entities/treatmentplan/disclosure/full/PostDisclosureEntity";
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

  async getAllPostDisclosure(): Promise<PostDisclosureEntity[]> {
    return await this.repository.find()
  }

  async getPostDisclosureById(id: string): Promise<PostDisclosureEntity | null> {
    return await this.repository.findById(id);
  }

  async createPostDisclosure(patientData: PostDisclosureEntity, readiness: ExecuteDisclosureEntity): Promise<PostDisclosureEntity> {
    return await this.repository.create(patientData, readiness);
  }

  async getAllPostDisclosureByVisitId(): Promise<PostDisclosureEntity[]> {
    return await this.repository.find();
  }
}
