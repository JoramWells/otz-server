import { DataTypes, Model, UUIDV4 } from "sequelize";
import { Patient } from "../../../patients.models";
import { PatientVisits } from "../../../patientVisits.model";
import { PostDisclosureAttributes } from "otz-types";
import { FullDisclosure } from "./fullDisclosure.model";
import { connect } from "../../../../db/connect";
import { calculatePostDisclosureScore } from "../../../../../utils/treatmentPlan/completeFullDisclosure";
// import { type PatientEntity } from '../entities/PatientEntity'

export class PostDisclosure
  extends Model<PostDisclosureAttributes>
  implements PostDisclosureAttributes
{
  isPeerRelationshipAssessed: boolean = false;
  isGivenAppropriateInfo!: boolean;
  isAssessedFunctionalSchoolEngagement!: boolean;
  isAssessedPeerRelationshipAssessed!: boolean;
  isAssessedChildEngagement!: boolean;
  isChildQuestionsAllowed!: boolean;
  isAddressedNegativeSelfImage!: boolean;
  isAssessedMoodiness!: boolean;

  isReferredForPsychiatric!: boolean;

  taskFourComments!: string;
  finalComments!: string;

  id: string | undefined;
  patientID!: string;
}

PostDisclosure.init(
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

    isAddressedNegativeSelfImage: {
      type: DataTypes.BOOLEAN,
    },
    isAssessedChildEngagement: {
      type: DataTypes.BOOLEAN,
    },
    isAssessedFunctionalSchoolEngagement: {
      type: DataTypes.BOOLEAN,
    },

    isPeerRelationshipAssessed: {
      type: DataTypes.BOOLEAN,
    },

    isGivenAppropriateInfo: {
      type: DataTypes.BOOLEAN,
    },
    isReferredForPsychiatric: {
      type: DataTypes.BOOLEAN,
    },
    isChildQuestionsAllowed: {
      type: DataTypes.BOOLEAN,
    },
    isAssessedMoodiness: {
      type: DataTypes.BOOLEAN,
    },
    taskFourComments: {
      type: DataTypes.STRING,
    },
    finalComments: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connect,
    tableName: "postDisclosure",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

PostDisclosure.belongsTo(Patient, { foreignKey: "patientID" });
PostDisclosure.belongsTo(PatientVisits, { foreignKey: "patientVisitID" });

PostDisclosure.afterCreate(async (instance) => {
  const latest = await FullDisclosure.findOne({
    order: [["createdAt", "DESC"]],
    where: {
      patientID: instance.patientID,
    },
  });
  const score = calculatePostDisclosureScore(instance)
  if (!latest) {
    await FullDisclosure.create({
      patientID: instance.patientID,
      postDisclosureID: instance.id,
      score,
    });
  } else {
    latest.postDisclosureID = instance.id;
    latest.score += score;
  }
});
// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
