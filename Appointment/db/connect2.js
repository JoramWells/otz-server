const { Client } = require('pg');

const DB = 'otz';
const USERNAME = 'postgres';
const PASSWORD = 'postgres';

// const connect = new Sequelize(
//   DB,
//   USERNAME,
//   PASSWORD,
//   {
//     host: 'database',
//     dialect: 'postgres',
//     define: {
//       timestamps: true,
//       freezeTableName: true,
//       // pool: {
//       //   max: 5,
//       //   min: 0,
//       //   idle: 10000,
//       // },
//       logging: true,

//     },
//   },
// );

const connect = new Client({
  user: USERNAME,
  host: 'database',
  database: DB,
  password: PASSWORD,
  port: 5432, // default PostgreSQL port
});

module.exports = connect;
