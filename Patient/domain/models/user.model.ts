/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */

import { Model } from 'sequelize'
import { connect } from '../db/connect'

/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize')
// const County = require('./location/county.model')

interface UserInterface {
  id: string
  firstName: string
  middleName: string
  lastName: string
  email: string
  gender: string
  phoneNo: string
  countyID: string
  password: string
  dob: string
}

export class User extends Model<UserInterface> {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    firstName: {
      type: DataTypes.STRING
    },
    middleName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    gender: {
      type: DataTypes.STRING
    },
    phoneNo: {
      type: DataTypes.STRING
    },
    countyID: {
      type: DataTypes.INTEGER
    },
    dob: {
      type: DataTypes.DATE
    },
    password: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize: connect,
    tableName: 'users'
  }
)

// User.belongsTo(County, { foreignKey: 'countyID' })

// (async () => {
//   await sequelize.sync();
//   console.log('User Table synced successfully');
// })();
