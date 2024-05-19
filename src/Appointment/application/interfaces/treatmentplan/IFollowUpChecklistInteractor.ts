import { FollowUpChecklistEntity } from "../../../domain/entities/treatmentplan/FollowUpChecklistEntity";

export interface IFollowUpChecklistInteractor {
  createFollowUpChecklist: (data: FollowUpChecklistEntity) => Promise<FollowUpChecklistEntity>;
  getAllFollowUpChecklist: () => Promise<FollowUpChecklistEntity[]>;
  getFollowUpChecklistById: (id: string) => Promise<FollowUpChecklistEntity | null>;
}
