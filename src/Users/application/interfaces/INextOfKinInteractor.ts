import { NextOfKinInterface } from "otz-types"

export interface INextOfKinInteractor {
  createNextOfKin: (patientData: NextOfKinInterface) => Promise<NextOfKinInterface>
  getAllNextOfKins: () => Promise<NextOfKinInterface[]>
  getNextOfKinById: (id: string) => Promise<NextOfKinInterface[] | null>
}
