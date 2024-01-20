/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../../Patient/db/connect');

const ViralLoad = sequelize.define('viralload', {
  viral_load_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  vl_result: {
    type: DataTypes.STRING,
  },
  vl_validity: {
    type: DataTypes.STRING,
  },
  patient_id: {
    type: DataTypes.UUID,
  },
  vl_justification: {
    type: DataTypes.STRING,
  },
  last_vl_date: {
    type: DataTypes.STRING,
  },
});

// (async () => {
//   await sequelize.sync({force: true});
//   console.log('Table synced successfully');
// })();

module.exports = ViralLoad;
