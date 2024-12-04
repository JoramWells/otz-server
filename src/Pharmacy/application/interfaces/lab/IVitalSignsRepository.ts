import { VitalSignsInterface } from "otz-types"
import { VitalSignResponseInterface } from "../../../entities/VitalSignResponseInterface";

export interface IVitalSignsRepository {
  create: (
    data: VitalSignsInterface
  ) => Promise<VitalSignsInterface | null | undefined>;
  find: (
    hospitalID: string
  ) => Promise<VitalSignResponseInterface | undefined | null>;
  findById: (id: string) => Promise<VitalSignsInterface | null | undefined>;
  findByPatientId: (patientID: string) => Promise<VitalSignsInterface | null | undefined>;
  findByVisitId: (visitID: string) => Promise<VitalSignsInterface | null | undefined>;
}
