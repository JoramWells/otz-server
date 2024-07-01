import { FollowUpChecklistAttributes } from "otz-types";

export interface IFollowUpChecklistRepository {
  create: (data: FollowUpChecklistAttributes) => Promise<FollowUpChecklistAttributes>;
  find: () => Promise<FollowUpChecklistAttributes[]>;
  findById: (id: string) => Promise<FollowUpChecklistAttributes | null>;
  // count: () => Promise<MMASEntity | null>;
}
