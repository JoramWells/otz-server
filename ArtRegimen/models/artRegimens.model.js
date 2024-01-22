/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../db/connect');

const Art_regimen = sequelize.define('art_regimens', {
  art_regimen_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  art_desc: {
    type: DataTypes.STRING,
  },
  art_category_id: {
    type: DataTypes.UUID,
  },
});


(async () => {
  await sequelize.sync();
  console.log('Table synced succssfully');
})();


module.exports = Art_regimen;
