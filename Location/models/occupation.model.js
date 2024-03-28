/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize');
const sequelize = require('../../db/connect');

const Occupation = sequelize.define('occupations', {
  id:
     {
       type: DataTypes.UUID,
       primaryKey: true,
       defaultValue: UUIDV4,
     },
  occupationDescription:
     { type: DataTypes.STRING },
  // end
});
// (async () => {
//   await sequelize.sync();
//   console.log('Occupation table Table synced successfully');
// })();
module.exports = Occupation;
