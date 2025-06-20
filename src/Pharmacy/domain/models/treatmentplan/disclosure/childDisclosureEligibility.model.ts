import { DataTypes, Model, UUIDV4 } from "sequelize";
import { Patient } from "../../patients.models";
import { PatientVisits } from "../../patientVisits.model";
import { ChildDisclosureEligibilityAttributes } from "otz-types";
import { PartialDisclosure } from "./partialDisclosure.model";
import { connect } from "../../../db/connect";
import { calculateEligibilityScore } from "../../../../utils/treatmentPlan/completePartialDisclosure";
// import { type PatientEntity } from '../entities/PatientEntity'

export class ChildDisclosureEligibility
  extends Model<ChildDisclosureEligibilityAttributes>
  implements ChildDisclosureEligibilityAttributes
{
  isCorrectAge!: boolean;
  isWillingToDisclose!: boolean;
  isKnowledgeable!: boolean;
  taskOneComments!: string;
  id: string | undefined;
  patientID!: string;
  patientVisitID!: string;
}

ChildDisclosureEligibility.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    patientID: {
      type: DataTypes.UUID,
      references: {
        model: "patients",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    patientVisitID: {
      type: DataTypes.UUID,
      references: {
        model: "patientVisits",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    isCorrectAge: {
      type: DataTypes.BOOLEAN,
    },
    isWillingToDisclose: {
      type: DataTypes.BOOLEAN,
    },
    isKnowledgeable: {
      type: DataTypes.BOOLEAN,
    },
    taskOneComments: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connect,
    tableName: "childDisclosureEligibility",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

ChildDisclosureEligibility.belongsTo(Patient, { foreignKey: "patientID" });
ChildDisclosureEligibility.belongsTo(PatientVisits, {
  foreignKey: "patientVisitID",
});

ChildDisclosureEligibility.afterCreate(async (instance) => {
  const latest = await PartialDisclosure.findOne({
    order: ["createdAt", "DESC"],
    where: {
      patientID: instance.patientID,
    },
  });

  const score = calculateEligibilityScore(instance);
  if (!latest) {
    await PartialDisclosure.create({
      patientID: instance.patientID,
      childDisclosureEligibilityID: instance.id,
      score,
    });
  } else {
    latest.childDisclosureEligibilityID = instance.id;
    latest.score += score;
    await latest.save();
  }
});

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
