import { ExecuteDisclosureAttributes, PostDisclosureAttributes } from "otz-types";

export interface IPostDisclosureInteractor {
  createPostDisclosure: (
    data: PostDisclosureAttributes
  ) => Promise<PostDisclosureAttributes>;
  getAllPostDisclosure: (
    hospitalID: string
  ) => Promise<PostDisclosureAttributes[] | null>;
  getPostDisclosureById: (
    id: string
  ) => Promise<PostDisclosureAttributes | null>;
  getAllPostDisclosureByVisitId: (
    id: string
  ) => Promise<PostDisclosureAttributes[] | null>;
}
