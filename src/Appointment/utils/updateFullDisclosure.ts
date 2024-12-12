import { col, fn, Op } from "sequelize";
import { ChildCaregiverReadiness } from "../domain/models/treatmentplan/disclosure/childCaregiverReadiness.model";
import { ChildDisclosureEligibility } from "../domain/models/treatmentplan/disclosure/childDisclosureEligibility.model";
import { PartialDisclosure } from "../domain/models/treatmentplan/disclosure/partialDisclosure.model";
import { ExecuteDisclosure } from "../domain/models/treatmentplan/disclosure/full/executeDisclosure.model";
import { PostDisclosure } from "../domain/models/treatmentplan/disclosure/full/postDisclosureAssessment.model";
import { FullDisclosure } from "../domain/models/treatmentplan/disclosure/full/fullDisclosure.model";
import { Patient } from "../domain/models/patients.models";

export async function updateFullDisclosure() {
  try {
    // Fetch all latest ChildCaregiverReadiness grouped by patientID
    const executeDisclosureRecords = await ExecuteDisclosure.findAll({
      attributes: [
        "id",
        "patientID",
        "isAssessedChildCaregiverComfort",
        "isAssessedDepthOfChildKnowledge",
        "isAssessedEnvironmentAndTiming",
        "isConcludedSessionReassured",
        "isExplainedCareOptions",
        "isInvitedChildQuestions",
        "isObservedImmediateReactions",
        "isReassuredCaregiver",
        "isReviewedBenefitsOfDisclosure",
        "isSupportedCaregiverChildToDisclose",
        "taskThreeComments",
        [fn("MAX", col("createdAt")), "latestCreatedAt"],
      ],
      group: ["id", "patientID"],
      order: [["createdAt", "DESC"]],
    });

    // Fetch all latest ChildDisclosureEligibility grouped by patientID
    const postDisclosureRecords = await PostDisclosure.findAll({
      attributes: [
        "id",
        "patientID",
        "isAddressedNegativeSelfImage",
        "isAssessedChildEngagement",
        "isAssessedFunctionalSchoolEngagement",
        "isPeerRelationshipAssessed",
        "isGivenAppropriateInfo",
        "isReferredForPsychiatric",
        "isChildQuestionsAllowed",
        "isAssessedMoodiness",
        "taskFourComments",
        "finalComments",
        [fn("MAX", col("createdAt")), "latestCreatedAt"],
      ],
      group: ["id", "patientID"],
      order: [["createdAt", "DESC"]],
    });

    // Map readiness by patientID
    const executeDisclosureMap = executeDisclosureRecords.reduce(
      (map, record) => {
        if (!map[record.patientID]) {
          map[record.patientID] = [];
        }
        const score =
          (record.isAssessedChildCaregiverComfort ? 1 : 0) +
          (record.isAssessedDepthOfChildKnowledge ? 1 : 0) +
          (record.isAssessedEnvironmentAndTiming ? 1 : 0) +
          (record.isConcludedSessionReassured ? 1 : 0) +
          (record.isExplainedCareOptions ? 1 : 0) +
          (record.isInvitedChildQuestions ? 1 : 0) +
          (record.isObservedImmediateReactions ? 1 : 0) +
          (record.isReassuredCaregiver ? 1 : 0) +
          (record.isReviewedBenefitsOfDisclosure ? 1 : 0) +
          (record.isSupportedCaregiverChildToDisclose ? 1 : 0) +
          (record.taskThreeComments?.length > 0 ? 1 : 0);

        map[record.patientID].push({
          id: record.id,
          score,
          percentage: (score / 11) * 100,
        });
        return map;
      },
      {}
    );

    // Map eligibility by patientID
    const postDisclosureMap = postDisclosureRecords.reduce((map, record) => {
      if (!map[record.patientID]) {
        map[record.patientID] = [];
      }
      const score =
        (record.isAddressedNegativeSelfImage ? 1 : 0) +
        (record.isAssessedChildEngagement ? 1 : 0) +
        (record.isAssessedFunctionalSchoolEngagement ? 1 : 0) +
        (record.isPeerRelationshipAssessed ? 1 : 0) +
        (record.isGivenAppropriateInfo ? 1 : 0) +
        (record.isChildQuestionsAllowed ? 1 : 0) +
        (record.isReferredForPsychiatric ? 1 : 0) +
        (record.isAssessedMoodiness ? 1 : 0) +
        (record.taskFourComments?.length > 0 ? 1 : 0) +
        (record.finalComments?.length > 0 ? 1 : 0);

      map[record.patientID].push({
        id: record.id,
        score,
        percentage: (score / 10) * 100,
      });
      return map;
    }, {});

    // Get all unique patientIDs
    const allPatientIDs = [
      ...new Set([
        ...Object.keys(executeDisclosureMap),
        ...Object.keys(postDisclosureMap),
      ]),
    ];

    // Iterate through patientIDs
    for (const patientID of allPatientIDs) {
      const executeDisclosureID = executeDisclosureMap[patientID] || [];
      const postDisclosureIDs = postDisclosureMap[patientID] || [];

      // Create combinations
      const combinations = [];
      executeDisclosureID.forEach((executeDisclosure) => {
        if (postDisclosureIDs.length > 0) {
          postDisclosureIDs.forEach((postDisclosure) => {
            combinations.push({ patientID, executeDisclosure, postDisclosure });
          });
        } else {
          combinations.push({
            patientID,
            executeDisclosure,
            postDisclosure: null,
          });
        }
      });

      if (postDisclosureIDs.length > 0 && executeDisclosureID.length === 0) {
        postDisclosureIDs.forEach((postDisclosure) => {
          combinations.push({
            patientID,
            executeDisclosure: null,
            postDisclosure,
          });
        });
      }

      // Update or create PartialDisclosure
      for (const {
        executeDisclosure,
        postDisclosure,
        patientID,
      } of combinations) {
        const fullDIsclosure = await FullDisclosure.findOne({
          where: {
            executeDisclosureID: executeDisclosure?.id || { [Op.is]: null },
            postDisclosureID: postDisclosure?.id || { [Op.is]: null },
          },
        });

        const score = executeDisclosure?.score + postDisclosure?.score;
        // const percentage =
        //   (executeDisclosure?.percentage + postDisclosure?.percentage) / 2;

        if (fullDIsclosure) {
          fullDIsclosure.executeDisclosureID = executeDisclosure?.id;
          fullDIsclosure.postDisclosureID = postDisclosure?.id;
          await fullDIsclosure.save();
        } else {
          if (score) {
            const isPatient = await Patient.findByPk(patientID);
            if (isPatient) {
              await FullDisclosure.create({
                score: score || 0,
                patientID,
                executeDisclosureID: executeDisclosure?.id,
                postDisclosureID: postDisclosure?.id,
                createdAt: new Date(),
                updatedAt: new Date(),
              });
            }
          }
        }
      }
    }

    console.log("PartialDisclosure updated successfully.");
  } catch (error) {
    console.error("Error updating FullDisclosure:", error);
  }
}
