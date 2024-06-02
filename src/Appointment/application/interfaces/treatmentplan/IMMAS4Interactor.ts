import { MMASFourEntity } from "../../../domain/entities/treatmentplan/MMASFourEntity";

export interface IMMASFourInteractor {
  createMMASFour: (data: MMASFourEntity) => Promise<MMASFourEntity>;
  getAllMMASFour: () => Promise<MMASFourEntity[]>;
  getMMASFourById: (id: string) => Promise<MMASFourEntity | null>;
  // getDailyMMASCount: () => Promise<MMASFourEntity | null>;
}
