/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */

import { Model } from 'sequelize'
import { connect } from '../db/connect'
import bcrypt from "bcrypt";

/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize')
import { UserInterface } from "otz-types";
// const County = require('./location/county.model')



export class User extends Model<UserInterface> {
  id?: string | undefined
  firstName!: string
  email!: string
  middleName!: string
  lastName?: string | undefined
  sex!: string
  dob!: string
  phoneNo?: string | undefined
  idNo!: string
  countyID!: string
  password: string | undefined
}

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
    idNo: {
      type: DataTypes.STRING
    },
    sex: {
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

async function generateDefaultHashedPassword() {
  const password = "12345678";
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  console.log(passwordHash, "as");
  return passwordHash;
}

User.beforeCreate(async (patient) => {
  patient.password = await generateDefaultHashedPassword();
});

// User.belongsTo(County, { foreignKey: 'countyID' })

// (async () => {
//   await sequelize.sync();
//   console.log('User Table synced successfully');
// })();
