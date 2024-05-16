/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { connect } from '../../db/connect'
import { Patient } from '../patients.models'

export interface VLDataProps {
  id: string
  vlResults: string
  dateOfVL: Date
  isVLValid: boolean
}

export interface PrescriptionProps {
  id: string
  refillDate: Date
  ART: {
    artName: string
  }
}

export interface PAMAInterface {
  id?: string
  childID: string
  childVLStatus: VLDataProps
  childPrescriptionStatus: PrescriptionProps
  primaryCaregiverVLStatus: VLDataProps
  primaryCaregiverPrescriptionStatus: PrescriptionProps
  primaryCaregiverID: string
  dateOfEnrollment: Date
  isPaired: boolean
  noOfCaregivers: number
}

export class PAMAProfile extends Model<PAMAInterface> {
  childID!: string
  childVLStatus!: VLDataProps
  childPrescriptionStatus!: PrescriptionProps
  primaryCaregiverVLStatus!: VLDataProps
  primaryCaregiverPrescriptionStatus!: PrescriptionProps
  primaryCaregiverID!: string
  dateOfEnrollment!: Date
  isPaired!: boolean
  noOfCaregivers!: number
}

PAMAProfile.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      // autoIncrement: true,
      defaultValue: UUIDV4
    },
    childID: {
      type: DataTypes.UUID,
      references: {
        model: 'patients',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    primaryCaregiverID: {
      type: DataTypes.UUID,
      references: {
        model: 'patients',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    childVLStatus: {
      type: DataTypes.JSONB
    },

    isPaired: {
      type: DataTypes.BOOLEAN
    },
    noOfCaregivers: {
      type: DataTypes.STRING
    },
    childPrescriptionStatus: {
      type: DataTypes.JSONB
    },
    primaryCaregiverVLStatus: {
      type: DataTypes.JSONB
    },
    primaryCaregiverPrescriptionStatus: {
      type: DataTypes.JSONB
    },
    dateOfEnrollment: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize: connect,
    tableName: 'pamaProfile'
  }
)

PAMAProfile.belongsTo(Patient, { foreignKey: 'childID' })
PAMAProfile.belongsTo(Patient, { foreignKey: 'primaryCaregiverID' })

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })();
