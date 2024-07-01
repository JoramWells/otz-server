import { CaregiverInterface } from "otz-types"

export interface ICaregiverRepository {
  create: (data: CaregiverInterface) => Promise<CaregiverInterface>
  find: () => Promise<CaregiverInterface[]>
  findById: (id: string) => Promise<CaregiverInterface[] | null>
}
