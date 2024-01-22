/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../../db/connect');

const MMAS = sequelize.define('mmas', {
  mmas_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  patient_id: {
    type: DataTypes.UUID,
  },
  isForget: {
    type: DataTypes.STRING,
  },
  isCareless: {
    type: DataTypes.STRING,
  },
  isQuitFeelWorse: {
    type: DataTypes.STRING,
  },
  isQuitFeelBetter: {
    type: DataTypes.STRING,
  },
  isTookMedYesterday: {
    type: DataTypes.STRING,
  },
  isQuitOutControl: {
    type: DataTypes.STRING,
  },
  isUnderPressure: {
    type: DataTypes.STRING,
  },
  isDifficultyRemembering: {
    type: DataTypes.STRING,
  },
});


// (async () => {
//   await sequelize.sync({force: true});
//   console.log('Table synced successfully');
// })();

module.exports = MMAS;
