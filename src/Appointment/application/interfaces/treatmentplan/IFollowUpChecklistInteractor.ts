import { FollowUpChecklistAttributes } from "otz-types";

export interface IFollowUpChecklistInteractor {
  createFollowUpChecklist: (data: FollowUpChecklistAttributes) => Promise<FollowUpChecklistAttributes>;
  getAllFollowUpChecklist: () => Promise<FollowUpChecklistAttributes[]>;
  getFollowUpChecklistById: (id: string) => Promise<FollowUpChecklistAttributes | null>;
}
