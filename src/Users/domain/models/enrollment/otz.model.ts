/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { connect } from '../../db/connect'
import { Patient } from '../patients.models'

export interface OTZInterface {
  id: string
  patientID: string
  dateOfEnrollmentToOTZ: Date
  vlResults: string
  dateOfVL: Date
  isValid: boolean
  currentARTRegimen: string
  currentARTStartDate: Date
  currentRegimenLine: string
}

export class OTZ extends Model<OTZInterface> {
  id!: string
  dateOfEnrollmentToOTZ!: Date
  patientID!: string
  vlResults!: string
  dateOfVL!: Date
  isValid!: boolean
  currentARTRegimen!: string
  currentARTStartDate!: Date
  currentRegimenLine!: string
}

OTZ.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4
      // autoIncrement: true
    },
    patientID: {
      type: DataTypes.UUID,
      references: {
        model: 'patients',
        key: 'id'
      }
    },

    dateOfEnrollmentToOTZ: {
      type: DataTypes.DATE
    },
    // artStartDate: {
    //   type: DataTypes.DATE,
    // },
    // originalARTRegimen: {
    //   type: DataTypes.UUID,
    //   references: {
    //     model: 'arts',
    //     key: 'id',
    //   },
    //   onDelete: 'CASCADE',

    // },
    vlResults: {
      type: DataTypes.STRING
    },
    dateOfVL: {
      type: DataTypes.DATE
    },
    isValid: {
      type: DataTypes.BOOLEAN
    },
    currentARTRegimen: {
      type: DataTypes.STRING
      // references: {
      //   model: 'arts',
      //   key: 'id',
      // },
      // onDelete: 'CASCADE',
    },
    currentARTStartDate: {
      type: DataTypes.DATE
    },

    currentRegimenLine: {
      type: DataTypes.UUID
    }
  },
  {
    sequelize: connect,

    tableName: 'otzEnrollments'
  }
)

OTZ.belongsTo(Patient, { foreignKey: 'patientID' })

// sequelize.sync()
// console.log('User Table synced successfully')

// export { Caregiver }
