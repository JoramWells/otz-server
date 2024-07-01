/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { connect } from '../db/connect'
import { Patient } from './patients.models'
import { NextOfKinInterface } from 'otz-types'



export class NextOfKin extends Model<NextOfKinInterface> {
  firstName!: string
  middleName!: string
  certificateNo: string | undefined
  phoneNo!: string
  sex!: string
  dob!: string
  idNo!: string
  patientID: string | undefined
  relationship!: string
  email: string | undefined
}

NextOfKin.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    patientID: {
      type: DataTypes.UUID,
      references: {
        model: 'patients',
        key: 'id'
      },
      onDelete: 'CASCADE'
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
    sex: {
      type: DataTypes.STRING
    },
    dob: {
      type: DataTypes.DATE
    },
    idNo: {
      type: DataTypes.STRING
    },
    phoneNo: {
      type: DataTypes.STRING
    },
    relationship: {
      type: DataTypes.STRING
    },
    certificateNo: {
      type: DataTypes.STRING
    }

  },
  {
    sequelize: connect,

    tableName: 'nextOfKin'
  }
)

NextOfKin.belongsTo(Patient, { foreignKey: 'patientID' })

// connect.sync()
// console.log('User Table synced successfully')

// export { Caregiver }
