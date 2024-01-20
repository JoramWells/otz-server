const Sequelize = require('sequelize');

// setting up sequelize

const DB = 'otz';
const USERNAME = 'postgres';
const PASSWORD = 'postgres';

const connect = new Sequelize(
    DB,
    USERNAME,
    PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres',
      define: {
        timestamps: false,
        freezeTableName: true,

      },
    },

);

module.exports = connect;
