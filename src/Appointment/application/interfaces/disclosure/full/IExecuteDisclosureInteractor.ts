import { ExecuteDisclosureAttributes } from "otz-types";

export interface IExecuteDisclosureInteractor {
  createExecuteDisclosure: (
    data: ExecuteDisclosureAttributes
  ) => Promise<ExecuteDisclosureAttributes>;
  getAllExecuteDisclosure: () => Promise<ExecuteDisclosureAttributes[]>;
  getExecuteDisclosureById: (
    id: string
  ) => Promise<ExecuteDisclosureAttributes | null>;
  getAllExecuteDisclosureByVisitId: (
    id: string
  ) => Promise<ExecuteDisclosureAttributes[] | null>;
}
