import { MMASEightEntity } from "../../../domain/entities/treatmentplan/MMASEightEntity";
import { MMASFourEntity } from "../../../domain/entities/treatmentplan/MMASFourEntity";

export interface IMMASEightRepository {
  create: (data4:MMASFourEntity, data: MMASEightEntity) => Promise<MMASEightEntity>;
  find: () => Promise<MMASEightEntity[]>;
  findById: (id: string) => Promise<MMASEightEntity | null>;
  // count: () => Promise<MMASEightEntity | null>;
}
