import { DataTypes, Model, UUIDV4 } from "sequelize";
import { connect } from "../../../../db/connect";
import { Patient } from "../../patients.models";
import { PatientVisits } from "../../patientVisits.model";
import { ChildCaregiverReadinessAttributes } from "otz-types";
import { PartialDisclosure } from "./partialDisclosure.model";
import { calculateReadinessScore } from "../../../../utils/completePartialDisclosure";

export class ChildCaregiverReadiness
  extends Model<ChildCaregiverReadinessAttributes>
  implements ChildCaregiverReadinessAttributes
{
  isFreeChildCaregiverFromSevereIllness!: boolean;
  isConsistentSocialSupport!: boolean;
  isInterestInEnvironmentAndPlaying!: boolean;
  isChildKnowsMedicineAndIllness!: boolean;
  isChildSchoolEngagement!: boolean;
  isAssessedCaregiverReadinessToDisclose!: boolean;
  taskTwoComments!: string;
  isCaregiverCommunicatedToChild!: boolean;
  isSecuredPatientInfo!: boolean;

  id: string | undefined;
  patientID!: string;
  patientVisitID!: string;
}

ChildCaregiverReadiness.init(
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
    },
    patientVisitID: {
      type: DataTypes.UUID,
      references: {
        model: "patientVisits",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    isChildKnowsMedicineAndIllness: {
      type: DataTypes.BOOLEAN,
    },
    isAssessedCaregiverReadinessToDisclose: {
      type: DataTypes.BOOLEAN,
    },
    isCaregiverCommunicatedToChild: {
      type: DataTypes.BOOLEAN,
    },
    isChildSchoolEngagement: {
      type: DataTypes.BOOLEAN,
    },

    isConsistentSocialSupport: {
      type: DataTypes.BOOLEAN,
    },
    isFreeChildCaregiverFromSevereIllness: {
      type: DataTypes.BOOLEAN,
    },
    isSecuredPatientInfo: {
      type: DataTypes.BOOLEAN,
    },
    isInterestInEnvironmentAndPlaying: {
      type: DataTypes.BOOLEAN,
    },
    taskTwoComments: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connect,
    tableName: "childCaregiverReadiness",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

ChildCaregiverReadiness.belongsTo(Patient, { foreignKey: "patientID" });
ChildCaregiverReadiness.belongsTo(PatientVisits, {
  foreignKey: "patientVisitID",
});

ChildCaregiverReadiness.afterCreate(async (instance) => {
  const latest = await PartialDisclosure.findOne({
    order: ["createdAt", "DESC"],
    where: {
      patientID: instance.patientID,
    },
  });

  const score = calculateReadinessScore(instance);
  if (!latest) {
    await PartialDisclosure.create({
      patientID: instance.patientID,
      childCaregiverReadinessID: instance.id,
      score,
    });
  } else {
    latest.childCaregiverReadinessID = instance.id;
    latest.score += score;
    await latest.save();
  }
});

// (async () => {
// await connect.sync()
// console.log('Patient Table synced successfully')
// })()
