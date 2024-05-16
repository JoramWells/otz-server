import { Sequelize } from 'sequelize'

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

export { connect }
