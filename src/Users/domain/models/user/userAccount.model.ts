/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */

import { Model } from 'sequelize'
import { connect } from '../../db/connect'
import bcrypt from "bcrypt";

/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize')
import { UserInterface } from "otz-types";
import { Hospital } from '../hospital/hospital.model';
import { User } from './user.model';
// const County = require('./location/county.model')

export enum UserRoles {
  Admin = "admin",
  Clinician = "clinician",
  MentorMother = "mentor mother",
  Advocate = "advocate",
  Nurse = "nurse",
}


export class UserAccount extends Model<UserInterface> {
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

UserAccount.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    userID: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
      onDelete: "CASCADE",
    },
    provider: {
      type: DataTypes.STRING,
    },
    providerAccountID: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.STRING,
    },
    access_token: {
      type: DataTypes.STRING,
    },
    expires_at: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: connect,
    tableName: "userAccounts",
  }
);



UserAccount.belongsTo(User, { foreignKey: "userID" });


// User.belongsTo(County, { foreignKey: 'countyID' })

// (async () => {
  // void connect.sync();
  // console.log('User Table synced successfully');
// })();
