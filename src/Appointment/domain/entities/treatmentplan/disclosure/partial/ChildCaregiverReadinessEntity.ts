import { ChildCaregiverReadinessAttributes } from "../../../../models/treatmentplan/disclosure/childCaregiverReadiness.model";

export class ChildCaregiverReadinessEntity implements ChildCaregiverReadinessAttributes {
  constructor() {}
  id?: string | undefined;
  patientID!: string;
  patientVisitID!: string;
  isFreeChildCaregiverFromSevereIllness!: boolean;
  isConsistentSocialSupport!: boolean;
  isInterestInEnvironmentAndPlaying!: boolean;
  isChildKnowsMedicineAndIllness!: boolean;
  isChildSchoolEngagement!: boolean;
  isAssessedCaregiverReadinessToDisclose!: boolean;
  isCaregiverCommunicatedToChild!: boolean;
  isSecuredPatientInfo!: boolean;
  taskTwoComments!: string;

}
