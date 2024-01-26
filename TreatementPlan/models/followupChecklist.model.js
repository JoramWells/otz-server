/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../../db/connect');

const FollowUPChecklist = sequelize.define('followUPChecklist', {
  followUPChecklistID: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  patientID: {
    type: DataTypes.UUID,
  },
  followUPDate: {
    type: DataTypes.UUID,
  },
  // 0867 + OTZ
  bmi: {
    type: DataTypes.STRING,
  },
  tannerStaging: {
    type: DataTypes.STRING,
  },
  disclosure: {
    type: DataTypes.STRING,
  },
  adherenceCounselling: {
    type: DataTypes.STRING,
  },
  isPAMA: {
    type: DataTypes.STRING,
  },
  isOVC: {
    type: DataTypes.STRING,
  },
  isActiveSupportGroup: {
    type: DataTypes.STRING,
  },
  isVLValid: {
    type: DataTypes.STRING,
  },
  isOptimizationDone: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});


// (async () => {
//   await sequelize.sync({force: true});
//   console.log('Table synced successfully');
// })();

module.exports = FollowUPChecklist;
