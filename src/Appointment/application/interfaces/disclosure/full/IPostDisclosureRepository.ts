import { ExecuteDisclosureAttributes, PostDisclosureAttributes } from "otz-types";


export interface IPostDisclosureRepository {
  create: (data: PostDisclosureAttributes, readiness: ExecuteDisclosureAttributes) => Promise<PostDisclosureAttributes>;
  find: () => Promise<PostDisclosureAttributes[]>;
  findById: (id: string) => Promise<PostDisclosureAttributes | null>;
  findAllByVisitId: (id: string) => Promise<PostDisclosureAttributes[] | null>;
  // count: () => Promise<MMASEntity | null>;
}
