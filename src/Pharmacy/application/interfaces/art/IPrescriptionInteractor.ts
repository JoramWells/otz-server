import { AppointmentAttributes, PrescriptionInterface } from "otz-types"

export interface IPrescriptionInteractor {
  createPrescription: (data: PrescriptionInterface, appointmentInput: AppointmentAttributes) => Promise<PrescriptionInterface | null>
  getAllPrescriptions: () => Promise<PrescriptionInterface[]>
  getPrescriptionById: (id: string) => Promise<PrescriptionInterface | null>
  getAllPrescriptionByPatientId: (id: string) => Promise<PrescriptionInterface[] | null>
  getPrescriptionDetails: (id: string) => Promise<PrescriptionInterface | null>
  getAllAdherence: () => Promise<PrescriptionInterface[] >
  getFacilityAdherence: () => Promise<string | number >
  editPrescription: (id: string) => Promise<PrescriptionInterface | number>

}
