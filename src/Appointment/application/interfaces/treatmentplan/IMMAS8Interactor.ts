import { MMASEightEntity } from "../../../domain/entities/treatmentplan/MMASEightEntity";
import { MMASFourEntity } from "../../../domain/entities/treatmentplan/MMASFourEntity";

export interface IMMASEightInteractor {
  createMMASEight: (data4:MMASFourEntity,data: MMASEightEntity) => Promise<MMASEightEntity>;
  getAllMMASEight: () => Promise<MMASEightEntity[]>;
  getMMASEightById: (id: string) => Promise<MMASEightEntity | null>;
  // getDailyMMASCount: () => Promise<MMASEightEntity | null>;
}
