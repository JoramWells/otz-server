import { type NextOfKinEntity } from '../../domain/entities/NextOfKinEntity'

export interface INextOfKinInteractor {
  createNextOfKin: (patientData: NextOfKinEntity) => Promise<NextOfKinEntity>
  getAllNextOfKins: () => Promise<NextOfKinEntity[]>
  getNextOfKinById: (id: string) => Promise<NextOfKinEntity[] | null>
}
