import { type AgeLine, type ArtPhase, type ArtCategoryInterface } from '../../models/art/artCategory.model'

export class ARTCategoryEntity implements ArtCategoryInterface {
  constructor (
    public id: string,
    public artCategoryDescription: string,
    public ageLine: AgeLine,
    public artPhase: ArtPhase
  ) {}
}
