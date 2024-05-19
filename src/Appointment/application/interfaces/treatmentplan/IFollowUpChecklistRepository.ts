import { FollowUpChecklistEntity } from "../../../domain/entities/treatmentplan/FollowUpChecklistEntity";

export interface IFollowUpChecklistRepository {
  create: (data: FollowUpChecklistEntity) => Promise<FollowUpChecklistEntity>;
  find: () => Promise<FollowUpChecklistEntity[]>;
  findById: (id: string) => Promise<FollowUpChecklistEntity | null>;
  // count: () => Promise<MMASEntity | null>;
}
