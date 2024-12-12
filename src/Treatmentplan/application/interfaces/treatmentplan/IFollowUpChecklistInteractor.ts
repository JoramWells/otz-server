import { FollowUpChecklistAttributes } from "otz-types";

export interface IFollowUpChecklistInteractor {
  createFollowUpChecklist: (data: FollowUpChecklistAttributes) => Promise<FollowUpChecklistAttributes>;
  getAllFollowUpChecklist: (hospitalID: string) => Promise<FollowUpChecklistAttributes[] | null>;
  getFollowUpChecklistById: (id: string) => Promise<FollowUpChecklistAttributes | null>;
}
