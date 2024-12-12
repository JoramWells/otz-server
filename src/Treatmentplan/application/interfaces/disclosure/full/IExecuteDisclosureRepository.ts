import { ExecuteDisclosureAttributes } from "otz-types";

export interface IExecuteDisclosureRepository {
  create: (
    data: ExecuteDisclosureAttributes
  ) => Promise<ExecuteDisclosureAttributes>;
  find: (hospitalID: string) => Promise<ExecuteDisclosureAttributes[] | null>;
  findById: (id: string) => Promise<ExecuteDisclosureAttributes | null | undefined>;
  findByPatientId: (
    patientID: string
  ) => Promise<ExecuteDisclosureAttributes | null | undefined>;
  findByVisitId: (
    patientVisitID: string
  ) => Promise<ExecuteDisclosureAttributes | null | undefined>;
  findAllByVisitId: (
    id: string
  ) => Promise<ExecuteDisclosureAttributes[] | null>;
  // count: () => Promise<MMASEntity | null>;
}
