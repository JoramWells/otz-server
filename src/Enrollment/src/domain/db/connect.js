const Sequelize = require('sequelize');

if (process.env.NODE_ENV === 'production') {
  require('dotenv').config({ path: '.env.production' })
} else {
  require('dotenv').config({ path: '.env.development' })
}


// setting up sequelize

const DB = 'otz';
const USERNAME = 'postgres';
const PASSWORD = 'postgres';

const connect = new Sequelize(
  DB,
  USERNAME,
  PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    define: {
      timestamps: true,
      freezeTableName: true,

    },
  },

);

module.exports = connect;
