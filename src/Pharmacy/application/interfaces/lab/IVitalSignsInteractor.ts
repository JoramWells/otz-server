import { VitalSignsInterface } from "otz-types";
import { VitalSignResponseInterface } from "../../../entities/VitalSignResponseInterface";

export interface IVitalSignsInteractor {
  createVitalSigns: (
    data: VitalSignsInterface
  ) => Promise<VitalSignsInterface | null | undefined>;
  getAllVitalSigns: (
    hospitalID: string
  ) => Promise<VitalSignResponseInterface | undefined | null>;
  getVitalSignsById: (
    id: string
  ) => Promise<VitalSignsInterface | null | undefined>;
  getVitalSignsByPatientId: (
    id: string
  ) => Promise<VitalSignsInterface | null | undefined>;
  getVitalSignsByVisitId: (
    id: string
  ) => Promise<VitalSignsInterface | null | undefined>;
}
