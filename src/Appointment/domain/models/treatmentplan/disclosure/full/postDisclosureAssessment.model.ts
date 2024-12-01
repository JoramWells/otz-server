import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../../../db/connect";
import { Patient } from "../../../patients.models";
import { PatientVisits } from "../../../patientVisits.model";
import { PostDisclosureAttributes } from "otz-types";
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
  patientVisitID!: string;
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
    patientVisitID: {
      type: DataTypes.UUID,
      references: {
        model: "patientVisits",
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

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
