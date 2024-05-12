import { type NextOfKinEntity } from '../../domain/entities/NextOfKinEntity'

export interface INextOfKinRepository {
  create: (data: NextOfKinEntity) => Promise<NextOfKinEntity>
  find: () => Promise<NextOfKinEntity[]>
  findById: (id: string) => Promise<NextOfKinEntity[] | null>
}
