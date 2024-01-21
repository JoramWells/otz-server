/* eslint-disable camelcase */
const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../db/connect');

const Art_detail = sequelize.define('art_details', {
  art_detail_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  art_name: {
    type: DataTypes.DATE,
  },
  art_category_id: {
    type: DataTypes.UUID,
  },
});

(async () => {
  await sequelize.sync();
  console.log('Table synced successfully');
})();

module.exports = Art_detail;
