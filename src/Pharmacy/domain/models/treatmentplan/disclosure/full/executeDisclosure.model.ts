import { DataTypes, Model, UUIDV4 } from "sequelize";
import { Patient } from "../../../patients.models";
import { PatientVisits } from "../../../patientVisits.model";
import { ExecuteDisclosureAttributes } from "otz-types";
import { FullDisclosure } from "./fullDisclosure.model";
import { connect } from "../../../../db/connect";

export class ExecuteDisclosure
  extends Model<ExecuteDisclosureAttributes>
  implements ExecuteDisclosureAttributes
{
  isReassuredCaregiver!: boolean;
  isAssessedChildCaregiverComfort!: boolean;
  isAssessedEnvironmentAndTiming!: boolean;
  isAssessedDepthOfChildKnowledge!: boolean;
  isSupportedCaregiverChildToDisclose!: boolean;
  isObservedImmediateReactions!: boolean;
  isInvitedChildQuestions!: boolean;
  taskThreeComments!: string;
  isReviewedBenefitsOfDisclosure!: boolean;
  isExplainedCareOptions!: boolean;
  isConcludedSessionReassured!: boolean;

  id: string | undefined;
  patientID!: string;
  patientVisitID!: string;
}

ExecuteDisclosure.init(
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

    isAssessedChildCaregiverComfort: {
      type: DataTypes.BOOLEAN,
    },
    isAssessedDepthOfChildKnowledge: {
      type: DataTypes.BOOLEAN,
    },
    isAssessedEnvironmentAndTiming: {
      type: DataTypes.BOOLEAN,
    },
    isConcludedSessionReassured: {
      type: DataTypes.BOOLEAN,
    },

    isExplainedCareOptions: {
      type: DataTypes.BOOLEAN,
    },
    isInvitedChildQuestions: {
      type: DataTypes.BOOLEAN,
    },
    isObservedImmediateReactions: {
      type: DataTypes.BOOLEAN,
    },
    isReassuredCaregiver: {
      type: DataTypes.BOOLEAN,
    },
    isReviewedBenefitsOfDisclosure: {
      type: DataTypes.BOOLEAN,
    },
    isSupportedCaregiverChildToDisclose: {
      type: DataTypes.BOOLEAN,
    },
    taskThreeComments: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connect,
    tableName: "executeDisclosure",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

ExecuteDisclosure.belongsTo(Patient, { foreignKey: "patientID" });
ExecuteDisclosure.belongsTo(PatientVisits, { foreignKey: "patientVisitID" });


