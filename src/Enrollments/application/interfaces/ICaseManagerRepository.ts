import { type CaseManagerEntity } from '../../domain/entities/CaseManagerEntity'

export interface ICaseManagerRepository {
  create: (data: CaseManagerEntity) => Promise<CaseManagerEntity>
  find: () => Promise<CaseManagerEntity[]>
  findById: (id: string) => Promise<CaseManagerEntity | null>
}
