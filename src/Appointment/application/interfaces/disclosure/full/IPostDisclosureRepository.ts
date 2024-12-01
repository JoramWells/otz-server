import { ExecuteDisclosureAttributes, PostDisclosureAttributes } from "otz-types";


export interface IPostDisclosureRepository {
  create: (data: PostDisclosureAttributes) => Promise<PostDisclosureAttributes>;
  find: (hospitalID: string) => Promise<PostDisclosureAttributes[] | null>;
  findById: (id: string) => Promise<PostDisclosureAttributes | null>;
  findByPatientId: (patientID: string) => Promise<PostDisclosureAttributes | null | undefined>;
  findAllByVisitId: (id: string) => Promise<PostDisclosureAttributes[] | null>;
  // count: () => Promise<MMASEntity | null>;
}

