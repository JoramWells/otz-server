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
  is_forget: {
    type: DataTypes.STRING,
  },
  is_careless: {
    type: DataTypes.STRING,
  },
  is_quit_feel_worse: {
    type: DataTypes.STRING,
  },
  is_quit_feel_better: {
    type: DataTypes.STRING,
  },
  is_took_med_yesterday: {
    type: DataTypes.STRING,
  },
  is_quit_out_control: {
    type: DataTypes.STRING,
  },
  is_under_pressure: {
    type: DataTypes.STRING,
  },
  is_difficulty_remembering: {
    type: DataTypes.STRING,
  },
});


// (async () => {
//   await sequelize.sync({force: true});
//   console.log('Table synced successfully');
// })();

module.exports = MMAS;