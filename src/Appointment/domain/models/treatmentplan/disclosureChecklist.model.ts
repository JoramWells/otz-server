import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { Patient } from "../patients.models";
import { PatientVisits } from "../patientVisits.model";
// import { type PatientEntity } from '../entities/PatientEntity'

 enum DifficultyRemembering {
   Never = "never",
   Once = "once in a while",
   Sometimes = "sometimes",
   Usually = "usually",
   AllTime = "all the time",
 }

export interface DisclosureChecklistAttributes {
  id?: string;
  patientID: string;
  patientVisitID: string;
  disclosureDate: Date;
  isCorrectAge: boolean;
  isWillingToDisclose: boolean;
  isChildActivityAssessed: boolean;
  isKnowledgeable: boolean;
  taskOneComments: string;
  isFreeFromSevereIllness: boolean;
  isFamilySupport: boolean;
  isSupportedCaregiverChildToDisclose: boolean;
  isEnvironmentInterest: boolean;
  isAware: boolean;
  isSchoolFree: boolean;
  isDisclosureReady: boolean;
  isChildCommunicated: boolean;
  isSecuredPatientInfo: boolean;
  taskTwoComments: string;
  isReassuredCaregiver: boolean;
  isAssessedChildCaregiverComfort: boolean;
  isObservedReactions: boolean;
  isInvitedChildQuestions: boolean;
  isReviewedBenefitsOfDisclosure: boolean;
  isExplainedCareOptions: boolean;
  isConcludedSessionReassured: boolean;
  taskThreeComments: string;
  isPeerRelationshipAssessed: boolean;
  isChildQuestionsAllowed: boolean;
  isAddressedNegativeImage: boolean;
  isAssessedMoodiness: boolean;
  isReferredForPhysic: boolean;
  isGivenInfo: boolean;
  taskFourComments: string;
  finalComments: string;
}

export class DisclosureChecklist extends Model<DisclosureChecklistAttributes> implements DisclosureChecklistAttributes {
  isChildActivityAssessed!: boolean;
  isSupportedCaregiverChildToDisclose!: boolean;
  isSecuredPatientInfo!: boolean;
  disclosureDate!: Date;
  isCorrectAge!: boolean;
  isWillingToDisclose!: boolean;
  isKnowledgeable!: boolean;
  taskOneComments!: string;
  isFreeFromSevereIllness!: boolean;
  isFamilySupport!: boolean;
  isEnvironmentInterest!: boolean;
  isAware!: boolean;
  isSchoolFree!: boolean;
  isDisclosureReady!: boolean;
  isChildCommunicated!: boolean;
  taskTwoComments!: string;
  isReassuredCaregiver!: boolean;
  isAssessedChildCaregiverComfort!: boolean;
  isObservedReactions!: boolean;
  isInvitedChildQuestions!: boolean;
  isReviewedBenefitsOfDisclosure!: boolean;
  isExplainedCareOptions!: boolean;
  isConcludedSessionReassured!: boolean;
  taskThreeComments!: string;
  isPeerRelationshipAssessed!: boolean;
  isChildQuestionsAllowed!: boolean;
  isAddressedNegativeImage!: boolean;
  isAssessedMoodiness!: boolean;
  isReferredForPhysic!: boolean;
  isGivenInfo!: boolean;
  taskFourComments!: string;
  finalComments!: string;
  id: string | undefined;
  patientID!: string;
  patientVisitID!: string;

}

DisclosureChecklist.init(
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
    },
    patientVisitID: {
      type: DataTypes.UUID,
      references: {
        model: "patientVisits",
        key: "id",
      },
    },
    disclosureDate: {
      type: DataTypes.DATE,
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
    isFreeFromSevereIllness: {
      type: DataTypes.BOOLEAN,
    },

    isFamilySupport: {
      type: DataTypes.BOOLEAN,
    },
    isEnvironmentInterest: {
      type: DataTypes.BOOLEAN,
    },
    isAware: {
      type: DataTypes.BOOLEAN,
    },
    isSchoolFree: {
      type: DataTypes.BOOLEAN,
    },
    isDisclosureReady: {
      type: DataTypes.BOOLEAN,
    },
    isChildCommunicated: {
      type: DataTypes.BOOLEAN,
    },
    isSecuredPatientInfo: {
      type: DataTypes.BOOLEAN,
    },
    taskTwoComments: {
      type: DataTypes.STRING,
    },

    isReassuredCaregiver: {
      type: DataTypes.BOOLEAN,
    },
    isAssessedChildCaregiverComfort: {
      type: DataTypes.BOOLEAN,
    },
    isSupportedCaregiverChildToDisclose: {
      type: DataTypes.BOOLEAN,
    },
    isObservedReactions: {
      type: DataTypes.BOOLEAN,
    },
    isInvitedChildQuestions: {
      type: DataTypes.BOOLEAN,
    },
    isReviewedBenefitsOfDisclosure: {
      type: DataTypes.BOOLEAN,
    },
    isExplainedCareOptions: {
      type: DataTypes.BOOLEAN,
    },
    isConcludedSessionReassured: {
      type: DataTypes.BOOLEAN,
    },
    taskThreeComments: {
      type: DataTypes.STRING,
    },

    isPeerRelationshipAssessed: {
      type: DataTypes.BOOLEAN,
    },
    isChildActivityAssessed: {
      type: DataTypes.BOOLEAN,
    },
    isChildQuestionsAllowed: {
      type: DataTypes.BOOLEAN,
    },
    isAddressedNegativeImage: {
      type: DataTypes.BOOLEAN,
    },
    isAssessedMoodiness: {
      type: DataTypes.BOOLEAN,
    },
    isReferredForPhysic: {
      type: DataTypes.BOOLEAN,
    },
    isGivenInfo: {
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
    tableName: "disclosureChecklist",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

DisclosureChecklist.belongsTo(Patient, { foreignKey: "patientID" });
DisclosureChecklist.belongsTo(PatientVisits, { foreignKey: "patientVisitID" });

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
