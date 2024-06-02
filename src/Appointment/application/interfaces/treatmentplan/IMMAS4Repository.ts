import { MMASFourEntity } from "../../../domain/entities/treatmentplan/MMASFourEntity";

export interface IMMASFourRepository {
  create: (data: MMASFourEntity) => Promise<MMASFourEntity>;
  find: () => Promise<MMASFourEntity[]>;
  findById: (id: string) => Promise<MMASFourEntity | null>;
  // count: () => Promise<MMASFourEntity | null>;
}
