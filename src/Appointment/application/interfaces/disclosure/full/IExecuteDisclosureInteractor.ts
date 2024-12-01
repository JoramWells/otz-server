import { ExecuteDisclosureAttributes } from "otz-types";

export interface IExecuteDisclosureInteractor {
  createExecuteDisclosure: (
    data: ExecuteDisclosureAttributes
  ) => Promise<ExecuteDisclosureAttributes>;
  getAllExecuteDisclosure: (
    hospitalID: string
  ) => Promise<ExecuteDisclosureAttributes[] | null>;
  getExecuteDisclosureById: (
    id: string
  ) => Promise<ExecuteDisclosureAttributes | null>;
  getExecuteDisclosureByPatientId: (
    patientID: string
  ) => Promise<ExecuteDisclosureAttributes | null | undefined>;
  getExecuteDisclosureByVisitId: (
    patientVisitID: string
  ) => Promise<ExecuteDisclosureAttributes | null | undefined>;
  getAllExecuteDisclosureByVisitId: (
    id: string
  ) => Promise<ExecuteDisclosureAttributes[] | null>;
}
