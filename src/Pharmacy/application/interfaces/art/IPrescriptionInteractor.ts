import { AppointmentAttributes, PrescriptionInterface } from "otz-types"
import { PrescriptionResponseInterface } from "../../../domain/models/art/prescription.model";

export interface IPrescriptionInteractor {
  createPrescription: (
    data: PrescriptionInterface,
    appointmentInput: AppointmentAttributes
  ) => Promise<PrescriptionInterface | null>;
  getAllPrescriptions: (
    dateQuery: string,
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string,
    frequency: string,
    line: string,
    regimen: string,
    status: string
  ) => Promise<PrescriptionResponseInterface | null | undefined>;
  getPrescriptionById: (id: string) => Promise<PrescriptionInterface | null>;
  getPrescriptionByVisitId: (
    visitID: string
  ) => Promise<PrescriptionInterface | null | undefined>;
  getAllPrescriptionByPatientId: (
    id: string
  ) => Promise<PrescriptionInterface[] | null>;
  getPrescriptionDetails: (id: string) => Promise<PrescriptionInterface | null>;
  getAllAdherence: () => Promise<PrescriptionInterface[]>;
  getFacilityAdherence: () => Promise<string | number>;
  editPrescription: (
    data: PrescriptionInterface
  ) => Promise<PrescriptionInterface | null>;
  findRecentRecentByPatientID: (
    id: string
    // agenda: string
  ) => Promise<PrescriptionInterface | null>;
}
