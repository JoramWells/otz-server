import { PostDisclosureEntity } from "../../../../domain/entities/treatmentplan/disclosure/full/PostDisclosureEntity";
import { ExecuteDisclosure } from "../../../../domain/models/treatmentplan/disclosure/full/executeDisclosure.model";

export interface IPostDisclosureInteractor {
  createPostDisclosure: (data: PostDisclosureEntity, disclose: ExecuteDisclosure  ) => Promise<PostDisclosureEntity>;
  getAllPostDisclosure: () => Promise<PostDisclosureEntity[]>;
  getPostDisclosureById: (
    id: string
  ) => Promise<PostDisclosureEntity | null>;
  getAllPostDisclosureByVisitId: (
    id: string
  ) => Promise<PostDisclosureEntity[] | null>;
}
