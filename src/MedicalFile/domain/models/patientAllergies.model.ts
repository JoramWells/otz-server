/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */

import { Model } from 'sequelize'
import { connect } from '../db/connect'

/* eslint-disable camelcase */
const { DataTypes, UUIDV4 } = require('sequelize')
// const County = require('./location/county.model')

export interface PatientAllergiesInterface {
  id?: string
  allergyID: string
  patientID: string
  onSetDate?: Date
}

export class PatientAllergies extends Model<PatientAllergiesInterface> {
  id?: string | undefined
  allergyID!: string
  patientID!: string
  onSetDate!: string
}

PatientAllergies.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    allergyID: {
      type: DataTypes.STRING
    },
    patientID: {
      type: DataTypes.STRING
    },
    onSetDate: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize: connect,
    tableName: 'patientAllergies'
  }
)

// User.belongsTo(County, { foreignKey: 'countyID' })

// (async () => {
//   await sequelize.sync();
//   console.log('User Table synced successfully');
// })();
