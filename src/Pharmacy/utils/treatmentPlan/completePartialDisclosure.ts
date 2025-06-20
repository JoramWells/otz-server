import {
  ChildCaregiverReadinessAttributes,
  ChildDisclosureEligibilityAttributes,
} from "otz-types";
import { PartialDisclosure } from "../../domain/models/treatmentplan/disclosure/partialDisclosure.model";

// calc score
export function calculateReadinessScore(data: ChildCaregiverReadinessAttributes) {
  const {
    isCaregiverCommunicatedToChild,
    isChildSchoolEngagement,
    isChildKnowsMedicineAndIllness,
    isAssessedCaregiverReadinessToDisclose,
    isConsistentSocialSupport,
    isSecuredPatientInfo,
    isFreeChildCaregiverFromSevereIllness,
    isInterestInEnvironmentAndPlaying,
    taskTwoComments,
  } = data;
  const score =
    (isCaregiverCommunicatedToChild ? 1 : 0) +
    (isChildSchoolEngagement ? 1 : 0) +
    (isChildKnowsMedicineAndIllness ? 1 : 0) +
    (isAssessedCaregiverReadinessToDisclose ? 1 : 0) +
    (isConsistentSocialSupport ? 1 : 0) +
    (isSecuredPatientInfo ? 1 : 0) +
    (isFreeChildCaregiverFromSevereIllness ? 1 : 0) +
    (isInterestInEnvironmentAndPlaying ? 1 : 0) +
    (taskTwoComments?.length > 0 ? 1 : 0);

  return score;
}

export function calculateEligibilityScore(data: ChildDisclosureEligibilityAttributes) {
  const {
    isCorrectAge,
    isKnowledgeable,
    isWillingToDisclose,
    taskOneComments,
  } = data;
  const score =
    (isCorrectAge ? 1 : 0) +
    (isKnowledgeable ? 1 : 0) +
    (isWillingToDisclose ? 1 : 0) +
    (taskOneComments?.length > 0 ? 1 : 0);
  return score;
}

export async function completePartialDisclosure({
  childCaregiverReadiness,
  childDisclosureEligibility,
}: {
  childCaregiverReadiness?: ChildCaregiverReadinessAttributes;
  childDisclosureEligibility?: ChildDisclosureEligibilityAttributes;
}) {
  //   ceck or readiness
  // score

  if (childCaregiverReadiness) {
    // updates partial disclosure --- incoming readiness
    const findUsersLatest = await PartialDisclosure.findOne({
      order: [["createdAt", "DESC"]],
      where: {
        patientID: childCaregiverReadiness.patientID,
      },
    });
    const score = calculateReadinessScore(childCaregiverReadiness);

    if (!findUsersLatest) {
      // create new
      await PartialDisclosure.create({
        patientID: childCaregiverReadiness.patientID,
        childCaregiverReadinessID: childCaregiverReadiness.id,
        score,
      });
    } else {
      // await PartialDisclosure.update({
      //   childCaregiverReadinessID: childCaregiverReadiness.id,
      //   score,
      // });
      findUsersLatest.childCaregiverReadinessID = childCaregiverReadiness.id
      findUsersLatest.score += score
      await findUsersLatest.save()
    }
  }

  //   ceck elibility
  if (childDisclosureEligibility) {
    // updates partial disclosure --- incoming readiness
    const findUsersLatest = await PartialDisclosure.findOne({
      order: [["createdAt", "DESC"]],
      where: {
        patientID: childDisclosureEligibility.patientID,
      },
    });

    // findLatest readiness

    const score = calculateEligibilityScore(childDisclosureEligibility);
    console.log(score);

    if (!findUsersLatest) {
      // create new
      await PartialDisclosure.create({
        patientID: childDisclosureEligibility.patientID,
        childDisclosureEligibilityID: childDisclosureEligibility.id,
        score,
      });
    } else {
      findUsersLatest.childDisclosureEligibilityID =
        childDisclosureEligibility.id;
      findUsersLatest.score += score;
      findUsersLatest.save();
    }
  }
}
