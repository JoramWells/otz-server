import { col, fn, Op } from "sequelize";
import { ChildCaregiverReadiness } from "../../domain/models/treatmentplan/disclosure/childCaregiverReadiness.model";
import { ChildDisclosureEligibility } from "../../domain/models/treatmentplan/disclosure/childDisclosureEligibility.model";

export async function updatePartialDisclosure() {
  try {
    // Fetch all latest ChildCaregiverReadiness grouped by patientID
    const readinessRecords = await ChildCaregiverReadiness.findAll({
      attributes: [
        "id",
        "patientID",
        "isChildKnowsMedicineAndIllness",
        "isAssessedCaregiverReadinessToDisclose",
        "isCaregiverCommunicatedToChild",
        "isChildSchoolEngagement",
        "isConsistentSocialSupport",
        "isFreeChildCaregiverFromSevereIllness",
        "isSecuredPatientInfo",
        "isInterestInEnvironmentAndPlaying",
        "taskTwoComments",
        [fn("MAX", col("createdAt")), "latestCreatedAt"],
      ],
      group: ["id", "patientID"],
      order: [["createdAt", "DESC"]],
    });

    // Fetch all latest ChildDisclosureEligibility grouped by patientID
    const eligibilityRecords = await ChildDisclosureEligibility.findAll({
      attributes: [
        "id",
        "patientID",
        "isCorrectAge",
        "isKnowledgeable",
        "isWillingToDisclose",
        "taskOneComments",
        [fn("MAX", col("createdAt")), "latestCreatedAt"],
      ],
      group: ["id", "patientID"],
      order: [["createdAt", "DESC"]],
    });

    // Map readiness by patientID
    const readinessMap = readinessRecords.reduce((map, record) => {
      if (!map[record.patientID]) map[record.patientID] = [];
      const score =
        (record.isCaregiverCommunicatedToChild ? 1 : 0) +
        (record.isChildSchoolEngagement ? 1 : 0) +
        (record.isChildKnowsMedicineAndIllness ? 1 : 0) +
        (record.isAssessedCaregiverReadinessToDisclose ? 1 : 0) +
        (record.isConsistentSocialSupport ? 1 : 0) +
        (record.isSecuredPatientInfo ? 1 : 0) +
        (record.isFreeChildCaregiverFromSevereIllness ? 1 : 0) +
        (record.isInterestInEnvironmentAndPlaying ? 1 : 0) +
        (record.taskTwoComments?.length > 0 ? 1 : 0);
      map[record.patientID].push({
        id: record.id,
        score,
        percentage: (score / 9) * 100,
      });
      return map;
    }, {});

    // Map eligibility by patientID
    const eligibilityMap = eligibilityRecords.reduce((map, record) => {
      if (!map[record.patientID]) map[record.patientID] = [];
      const score =
        (record.isCorrectAge ? 1 : 0) +
        (record.isKnowledgeable ? 1 : 0) +
        (record.isWillingToDisclose ? 1 : 0) +
        (record.taskOneComments?.length > 0 ? 1 : 0);
      map[record.patientID].push({
        id: record.id,
        score,
        percentage: (score / 4) * 100,
      });
      return map;
    }, {});

    // Get all unique patientIDs
    const allPatientIDs = [
      ...new Set([
        ...Object.keys(readinessMap),
        ...Object.keys(eligibilityMap),
      ]),
    ];

    // Iterate through patientIDs
    for (const patientID of allPatientIDs) {
      const readinessIDs = readinessMap[patientID] || [];
      const eligibilityIDs = eligibilityMap[patientID] || [];

      // Create combinations
      const combinations = [];
      readinessIDs.forEach((readiness) => {
        if (eligibilityIDs.length > 0) {
          eligibilityIDs.forEach((eligibility) => {
            combinations.push({ patientID, readiness, eligibility });
          });
        } else {
          combinations.push({ patientID, readiness, eligibility: null });
        }
      });

      if (eligibilityIDs.length > 0 && readinessIDs.length === 0) {
        eligibilityIDs.forEach((eligibility) => {
          combinations.push({ patientID, readiness: null, eligibility });
        });
      }

      // Update or create PartialDisclosure
      for (const { readiness, eligibility, patientID } of combinations) {
        const partialDisclosure = await PartialDisclosure.findOne({
          where: {
            childCaregiverReadinessID: readiness?.id || { [Op.is]: null },
            childDisclosureEligibilityID: eligibility?.id || { [Op.is]: null },
          },
        });

        const score = readiness?.score + eligibility?.score;
        // const percentage = (readiness.percentage + eligibility.percentage) / 2;

        if (partialDisclosure) {
          partialDisclosure.childCaregiverReadinessID = readiness?.id;
          partialDisclosure.childDisclosureEligibilityID = eligibility?.id;
          await partialDisclosure.save();
        } else {
          if (score) {
            const isPatient = await Patient.findByPk(patientID);

            if (isPatient) {
              await PartialDisclosure.create({
                score,
                // percentage,
                patientID,
                childCaregiverReadinessID: readiness?.id,
                childDisclosureEligibilityID: eligibility?.id,
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
    console.error("Error updating PartialDisclosure:", error);
  }
}
