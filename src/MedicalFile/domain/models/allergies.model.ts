/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */

import { Model } from 'sequelize'
import { connect } from '../db/connect'

/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize')
// const County = require('./location/county.model')

export interface AllergiesInterface {
  id?: string
  causativeAgent: string
  reaction: string
}

export class User extends Model<AllergiesInterface> {
  id?: string | undefined
  causativeAgent!: string
  reaction!: string
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    causativeAgent: {
      type: DataTypes.STRING
    },
    reaction: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize: connect,
    tableName: 'allergies'
  }
)

// User.belongsTo(County, { foreignKey: 'countyID' })

// (async () => {
//   await sequelize.sync();
//   console.log('User Table synced successfully');
// })();
