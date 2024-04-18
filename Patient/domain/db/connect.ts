const Sequelize = require('sequelize')

// setting up sequelize

const DB = 'otz'
const USERNAME = 'postgres'
const PASSWORD = 'postgres'

const connect = new Sequelize(
  DB,
  USERNAME,
  PASSWORD,
  {
    host: 'database',
    dialect: 'postgres',
    define: {
      timestamps: true,
      freezeTableName: true

    }
  }

)

module.exports = connect
