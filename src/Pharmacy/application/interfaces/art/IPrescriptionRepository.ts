import { AppointmentAttributes, PrescriptionInterface } from "otz-types"

export interface IPrescriptionRepository {
  create: (
    data: PrescriptionInterface,
    appointmentInput: AppointmentAttributes
  ) => Promise<PrescriptionInterface | null>;
  find: (dateQuery: string) => Promise<PrescriptionInterface[]>;
  findById: (id: string) => Promise<PrescriptionInterface | null>;
  findAllByPatientId: (id: string) => Promise<PrescriptionInterface[] | null>;
  findDetails: (id: string) => Promise<PrescriptionInterface | null>;
  findAllAdherence: () => Promise<PrescriptionInterface[]>;
  findFacilityAdherence: () => Promise<string | number>;
  edit: (data: PrescriptionInterface) => Promise<PrescriptionInterface | null>;
  getRecentPrescriptionByPatientID: (
    id: string,
    // agenda: string
  ) => Promise<PrescriptionInterface | null>;
}
