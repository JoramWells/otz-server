import { MMASEntity } from "../../../domain/entities/treatmentplan/MMASEntity";

export interface IMMASRepository {
  create: (data: MMASEntity) => Promise<MMASEntity>;
  find: () => Promise<MMASEntity[]>;
  findById: (id: string) => Promise<MMASEntity | null>;
  // count: () => Promise<MMASEntity | null>;
}
