import { FollowUpChecklistAttributes } from "otz-types";

export interface IFollowUpChecklistRepository {
  create: (
    data: FollowUpChecklistAttributes
  ) => Promise<FollowUpChecklistAttributes>;
  find: (hospitalID: string) => Promise<FollowUpChecklistAttributes[] | null>;
  findById: (id: string) => Promise<FollowUpChecklistAttributes | null>;
  // count: () => Promise<MMASEntity | null>;
}
