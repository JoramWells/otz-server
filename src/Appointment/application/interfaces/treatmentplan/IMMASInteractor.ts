import { MMASEntity } from "../../../domain/entities/treatmentplan/MMASEntity";

export interface IMMASInteractor {
  createMMAS: (data: MMASEntity) => Promise<MMASEntity>;
  getAllMMAS: () => Promise<MMASEntity[]>;
  getMMASById: (id: string) => Promise<MMASEntity | null>;
  // getDailyMMASCount: () => Promise<MMASEntity | null>;
}
