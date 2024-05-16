import { type CaregiverEntity } from '../../domain/entities/CaregiverEntity'

export interface ICaregiverRepository {
  create: (data: CaregiverEntity) => Promise<CaregiverEntity>
  find: () => Promise<CaregiverEntity[]>
  findById: (id: string) => Promise<CaregiverEntity[] | null>
}
