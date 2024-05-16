import { type PAMAProfileEntity } from '../../../domain/entities/PAMAProfileEntity'

export interface IPAMARepository {
  create: (data: PAMAProfileEntity) => Promise<PAMAProfileEntity>
  find: () => Promise<PAMAProfileEntity[]>
  findById: (id: string) => Promise<PAMAProfileEntity | null>
}
