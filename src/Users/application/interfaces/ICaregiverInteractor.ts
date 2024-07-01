import { CaregiverInterface } from "otz-types"

export interface ICaregiverInteractor {
  createCaregiver: (patientData: CaregiverInterface) => Promise<CaregiverInterface>
  getAllCaregivers: () => Promise<CaregiverInterface[]>
  getCaregiverById: (id: string) => Promise<CaregiverInterface[] | null>
}
