import { ExecuteDisclosureAttributes } from "otz-types";

export interface IExecuteDisclosureRepository {
  create: (data: ExecuteDisclosureAttributes) => Promise<ExecuteDisclosureAttributes>;
  find: () => Promise<ExecuteDisclosureAttributes[]>;
  findById: (id: string) => Promise<ExecuteDisclosureAttributes | null>;
  findAllByVisitId: (id: string) => Promise<ExecuteDisclosureAttributes[] | null>;
  // count: () => Promise<MMASEntity | null>;
}
