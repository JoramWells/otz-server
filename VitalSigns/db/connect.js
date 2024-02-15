const Sequelize = require('sequelize');

// setting up sequelize

const DB = 'huruma2';
const USERNAME = 'postgres';
const PASSWORD = 'root';

const connect = new Sequelize(
  DB,
  USERNAME,
  PASSWORD,
  {
    host: 'otz_database_1,',
    dialect: 'postgres',
    define: {
      timestamps: false,
      freezeTableName: true,

    },
  },

);

module.exports = connect;
