import { AppointmentAttributes, PrescriptionInterface } from "otz-types"
import { PrescriptionResponseInterface } from "../../../domain/models/art/prescription.model";

export interface IPrescriptionRepository {
  create: (
    data: PrescriptionInterface,
    appointmentInput: AppointmentAttributes
  ) => Promise<PrescriptionInterface | null>;
  find: (
    dateQuery: string,
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ) => Promise<PrescriptionResponseInterface | null>;
  findById: (id: string) => Promise<PrescriptionInterface | null>;
  findByVisitId: (visitID: string) => Promise<PrescriptionInterface | null | undefined>;
  findAllByPatientId: (id: string) => Promise<PrescriptionInterface[] | null>;
  findDetails: (id: string) => Promise<PrescriptionInterface | null>;
  findAllAdherence: () => Promise<PrescriptionInterface[]>;
  findFacilityAdherence: () => Promise<string | number>;
  edit: (data: PrescriptionInterface) => Promise<PrescriptionInterface | null>;
  getRecentPrescriptionByPatientID: (
    id: string
    // agenda: string
  ) => Promise<PrescriptionInterface | null>;
}
