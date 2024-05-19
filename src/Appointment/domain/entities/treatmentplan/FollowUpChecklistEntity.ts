import { FollowUpChecklistAttributes } from "../../models/treatmentplan/followupChecklist.model";

export class FollowUpChecklistEntity implements FollowUpChecklistAttributes {
  constructor() {}
  followUpDate!: Date;
  bmi!: number;
  tannerStaging!: string;
  disclosure!: string;
  adherenceCounselling!: string;
  isPAMA!: boolean;
  isOVC!: boolean;
  isActiveSupportGroup!: boolean;
  isVLValid!: boolean;
  isOptimizationDone!: boolean;
  id?: string | undefined;
  patientID!: string;
  patientVisitID!: string;

}
