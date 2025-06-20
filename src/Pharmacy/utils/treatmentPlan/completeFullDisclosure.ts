import {
  ExecuteDisclosureAttributes,
  PostDisclosureAttributes,
} from "otz-types";
import { FullDisclosure } from "../../domain/models/treatmentplan/disclosure/full/fullDisclosure.model";

export function calculateExecuteDisclosureScore(data: ExecuteDisclosureAttributes) {
  const {
    isAssessedChildCaregiverComfort,
    isAssessedDepthOfChildKnowledge,
    isAssessedEnvironmentAndTiming,
    isConcludedSessionReassured,
    isExplainedCareOptions,
    isInvitedChildQuestions,
    isObservedImmediateReactions,
    isReassuredCaregiver,
    isReviewedBenefitsOfDisclosure,
    isSupportedCaregiverChildToDisclose,
    taskThreeComments,
  } = data;
  const score =
    (isAssessedChildCaregiverComfort ? 1 : 0) +
    (isAssessedDepthOfChildKnowledge ? 1 : 0) +
    (isAssessedEnvironmentAndTiming ? 1 : 0) +
    (isConcludedSessionReassured ? 1 : 0) +
    (isExplainedCareOptions ? 1 : 0) +
    (isInvitedChildQuestions ? 1 : 0) +
    (isObservedImmediateReactions ? 1 : 0) +
    (isReassuredCaregiver ? 1 : 0) +
    (isReviewedBenefitsOfDisclosure ? 1 : 0) +
    (isSupportedCaregiverChildToDisclose ? 1 : 0) +
    (taskThreeComments?.length > 0 ? 1 : 0);

  return score;
}

// postdisclosure score
export function calculatePostDisclosureScore(data: PostDisclosureAttributes) {
  const {
    isAddressedNegativeSelfImage,
    isAssessedChildEngagement,
    isAssessedFunctionalSchoolEngagement,
    isPeerRelationshipAssessed,
    isGivenAppropriateInfo,
    isAssessedMoodiness,
    isChildQuestionsAllowed,
    isReferredForPsychiatric,
    taskFourComments,
    finalComments,
  } = data;
  const score =
    (isAddressedNegativeSelfImage ? 1 : 0) +
    (isAssessedChildEngagement ? 1 : 0) +
    (isAssessedFunctionalSchoolEngagement ? 1 : 0) +
    (isPeerRelationshipAssessed ? 1 : 0) +
    (isGivenAppropriateInfo ? 1 : 0) +
    (isChildQuestionsAllowed ? 1 : 0) +
    (isReferredForPsychiatric ? 1 : 0) +
    (isAssessedMoodiness ? 1 : 0) +
    (taskFourComments?.length > 0 ? 1 : 0) +
    (finalComments?.length > 0 ? 1 : 0);

  return score;
}

export async function completeFullDisclosure({
  executeDisclosure,
  postDisclosure,
}: {
  executeDisclosure: ExecuteDisclosureAttributes;
  postDisclosure: PostDisclosureAttributes;
}) {
  if (executeDisclosure) {
    const findLatestFullDisclosure = await FullDisclosure.findOne({
      order: [["createdAt", "DESC"]],
      where: {
        patientID: executeDisclosure.patientID,
      },
    });

    const score = calculateExecuteDisclosureScore(executeDisclosure);

    if (findLatestFullDisclosure) {
      findLatestFullDisclosure.executeDisclosureID = executeDisclosure.id;
      findLatestFullDisclosure.score += score;
      findLatestFullDisclosure.save();
    } else {
      await FullDisclosure.create({
        patientID: executeDisclosure.patientID,
        executeDisclosureID: executeDisclosure.id,
        score,
      });
    }
  }

  //   postdisclosure
  if (postDisclosure) {
    const findLatestFullDisclosure = await FullDisclosure.findOne({
      order: [["createdAt", "DESC"]],
      where: {
        patientID: postDisclosure.patientID,
      },
    });

    const score = calculatePostDisclosureScore(postDisclosure);

    if (findLatestFullDisclosure) {
      findLatestFullDisclosure.postDisclosureID = postDisclosure.id;
      findLatestFullDisclosure.score += score;
      findLatestFullDisclosure.save();
    } else {
      await FullDisclosure.create({
        patientID: postDisclosure.patientID,
        postDisclosureID: postDisclosure.id,
        score,
      });
    }
  }
}
