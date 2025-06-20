import { col, fn, Op, Sequelize } from "sequelize";
import { Patient } from "../../domain/models/patients.models";
import { PartialDisclosure } from "../../domain/models/treatmentplan/disclosure/partialDisclosure.model";
import { ChildDisclosureEligibility } from "../../domain/models/treatmentplan/disclosure/childDisclosureEligibility.model";
import { FullDisclosure } from "../../domain/models/treatmentplan/disclosure/full/fullDisclosure.model";
import { ExecuteDisclosure } from "../../domain/models/treatmentplan/disclosure/full/executeDisclosure.model";
import { DisclosureTracker } from "../../domain/models/treatmentplan/disclosure/disclosureTracker.model";

export async function updatePartialIndexTracker() {
  try {
    const patients = await Patient.findAll({
      attributes: ["id"],
      where: {
        dob: {
          [Op.between]: [
            new Date().setFullYear(new Date().getFullYear() - 14),
            new Date().setFullYear(new Date().getFullYear() - 5),
          ],
        },
      },
    });

    const disclosedPatients = await PartialDisclosure.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: ChildDisclosureEligibility,
          attributes: [
            "patientID",
            "createdAt",
            [
              fn("MAX", col("ChildDisclosureEligibility.createdAt")),
              "latestCreatedAt",
            ],
          ],
          // where: {
          //   createdAt: {
          //     [Op.in]: Sequelize.literal(`
          //       SELECT MAX("createdAt)
          //       FROM "ChildDisclosureEligibility"
          //       WHERE "ChildDisclosureEligibility"."patientID" = "ChildDisclosureEligibility"."patientID"
          //       `),
          //   },
          // },
        },
      ],
      group: ["ChildDisclosureEligibility.id", "PartialDisclosure.id"],
    });

    const fullDisclosed = await FullDisclosure.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: ExecuteDisclosure,
          attributes: [
            "patientID",
            "createdAt",
            [fn("MAX", col("ExecuteDisclosure.createdAt")), "latestCreatedAt"],
          ],
          // where: {
          //   createdAt: {
          //     [Op.in]: Sequelize.literal(`
          //       SELECT MAX("createdAt)
          //       FROM "ChildDisclosureEligibility"
          //       WHERE "ChildDisclosureEligibility"."patientID" = "ChildDisclosureEligibility"."patientID"
          //       `),
          //   },
          // },
        },
      ],
      group: ["ExecuteDisclosure.id", "FullDisclosure.id"],
    });

    // console.log("Killin.");

    const disclosedPatientMap = new Map(
      disclosedPatients
        .filter((disclosure) => disclosure.ChildDisclosureEligibility.patientID !== null)
        .map((disclosure) => [
          disclosure.ChildDisclosureEligibility.patientID,
          disclosure.id,
        ])
    );

    const fullDisclosureMap = new Map(
      fullDisclosed
        .filter((full) => full.ExecuteDisclosure.patientID !== null)
        .map((full) => [full.ExecuteDisclosure.patientID, full.id])
    );

    const indexData = patients.map((patient) => ({
      patientID: patient.id,
      partialDisclosureID: disclosedPatientMap.get(patient.id) || null,
      fullDisclosureID: fullDisclosureMap.get(patient.id) || null,
    }));

    await DisclosureTracker.bulkCreate(indexData, {
      updateOnDuplicate: [
        "partialDisclosureID",
        "fullDisclosureID",
        "patientID",
      ],
    });
  } catch (error) {
    console.log(error);
  }
}
