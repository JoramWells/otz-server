import { ExecuteDisclosureAttributes, PostDisclosureAttributes } from "otz-types";

export interface IPostDisclosureInteractor {
  createPostDisclosure: (data: PostDisclosureAttributes, disclose: ExecuteDisclosureAttributes  ) => Promise<PostDisclosureAttributes>;
  getAllPostDisclosure: () => Promise<PostDisclosureAttributes[]>;
  getPostDisclosureById: (
    id: string
  ) => Promise<PostDisclosureAttributes | null>;
  getAllPostDisclosureByVisitId: (
    id: string
  ) => Promise<PostDisclosureAttributes[] | null>;
}
