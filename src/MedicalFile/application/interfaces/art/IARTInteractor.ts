import { type ARTEntity } from '../../../domain/entities/art/ARTEntity'

export interface IARTInteractor {
  createART: (data: ARTEntity) => Promise<ARTEntity | null>
  getAllARTs: () => Promise<ARTEntity[]>
  getARTById: (id: string) => Promise<ARTEntity | null>
}
