/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');

const DisclosureChecklist = sequelize.define('disclosureChecklists', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  patientID: {
    type: DataTypes.UUID,
    references: {
      model: 'patients',
      key: 'id',
    },
  },
  disclosureDate: {
    type: DataTypes.STRING,
  },
  isCorrectAge: {
    type: DataTypes.STRING,
  },
  isWillingToDisclose: {
    type: DataTypes.STRING,
  },
  isKnowledgeable: {
    type: DataTypes.STRING,
  },
  taskOneComments: {
    type: DataTypes.STRING,
  },
  isFreeFromSevereIllness: {
    type: DataTypes.STRING,
  },

  isFamilySupport: {
    type: DataTypes.STRING,
  },
  isEnvironmentInterest: {
    type: DataTypes.STRING,
  },
  isAware: {
    type: DataTypes.STRING,
  },
  isSchoolFree: {
    type: DataTypes.STRING,
  },
  isDisclosureReady: {
    type: DataTypes.STRING,
  },
  isChildCommunicated: {
    type: DataTypes.STRING,
  },
  isSecuredPatientInfo: {
    type: DataTypes.STRING,
  },
  taskTwoComments: {
    type: DataTypes.STRING,
  },

  isReassuredCaregiver: {
    type: DataTypes.STRING,
  },
  isAssessedChildCaregiverComfort: {
    type: DataTypes.STRING,
  },
  isSupportedCaregiverChildToDisclose: {
    type: DataTypes.STRING,
  },
  isObservedReactions: {
    type: DataTypes.STRING,
  },
  isInvitedChildQuestions: {
    type: DataTypes.STRING,
  },
  isReviewedBenefitsOfDisclosure: {
    type: DataTypes.STRING,
  },
  isExplainedCareOptions: {
    type: DataTypes.STRING,
  },
  isConcludedSessionReassured: {
    type: DataTypes.STRING,
  },
  taskThreeComments: {
    type: DataTypes.STRING,
  },

  isPeerRelationshipAssessed: {
    type: DataTypes.STRING,
  },
  isChildActivityAssessed: {
    type: DataTypes.STRING,
  },
  isChildQuestionsAllowed: {
    type: DataTypes.STRING,
  },
  isAddressedNegativeImage: {
    type: DataTypes.STRING,
  },
  isAssessedMoodiness: {
    type: DataTypes.STRING,
  },
  isReferredForPhysic: {
    type: DataTypes.STRING,
  },
  isGivenInfo: {
    type: DataTypes.STRING,
  },
  taskFourComments: {
    type: DataTypes.STRING,
  },
  finalComments: {
    type: DataTypes.STRING,
  },
});

// (async () => {
//   await sequelize.sync({force: true});
//   console.log('Table synced successfully');
// })();

module.exports = DisclosureChecklist;