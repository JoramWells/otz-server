/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, UUIDV4 } from 'sequelize'
const sequelize = require('../../db/connect')

const Location = sequelize.define('locations', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  countyCode: {
    type: DataTypes.STRING
  },

  countyName: {
    type: DataTypes.STRING
  },
  subCountyCode: {
    type: DataTypes.STRING
  },
  subCountyName: {
    type: DataTypes.STRING
  }
})

// (async () => {
//   await sequelize.sync();
//   console.log('LOCATION Table synced successfully');
// })();

export { Location }
