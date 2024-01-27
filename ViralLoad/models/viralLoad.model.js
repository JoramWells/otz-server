/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../../Patient/db/connect');

const ViralLoad = sequelize.define('viralload', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  vlResult: {
    type: DataTypes.STRING,
  },
  vlValidity: {
    type: DataTypes.STRING,
  },
  patientID: {
    type: DataTypes.UUID,
    references: {
      model: 'patient',
      id: 'key',
    },
  },
  vlJustification: {
    type: DataTypes.STRING,
  },
  lastVlDate: {
    type: DataTypes.DATEONLY,
  },
});

// (async () => {
//   await sequelize.sync({force: true});
//   console.log('Table synced successfully');
// })();

module.exports = ViralLoad;
