import { ExecuteDisclosureEntity } from "../../../../domain/entities/treatmentplan/disclosure/full/ExecuteDisclosureEntity";
import { PostDisclosureEntity } from "../../../../domain/entities/treatmentplan/disclosure/full/PostDisclosureEntity";


export interface IPostDisclosureRepository {
  create: (data: PostDisclosureEntity, readiness: ExecuteDisclosureEntity) => Promise<PostDisclosureEntity>;
  find: () => Promise<PostDisclosureEntity[]>;
  findById: (id: string) => Promise<PostDisclosureEntity | null>;
  findAllByVisitId: (id: string) => Promise<PostDisclosureEntity[] | null>;
  // count: () => Promise<MMASEntity | null>;
}
