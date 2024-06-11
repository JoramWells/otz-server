/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { connect } from '../../db/connect'
import { Patient } from '../patients.models'
import { ART } from './art.model'
import { PatientVisits } from '../patientVisits.model'
import { ARTPrescription } from './artPrescription.model'

export interface PrescriptionInterface {
  id?: string
  patientID: string
  patientVisitID: string
  artPrescriptionID: string
  drugID: string
  noOfPills: number
  frequency: number
  refillDate: Date
  nextRefillDate: Date

  //
  expectedNoOfPills: number
  computedNoOfPills: number
  updatedAtExpectedNoOfPills: Date
}

export class Prescription extends Model<PrescriptionInterface> {
  id: string | undefined
  patientID!: string
  patientVisitID!: string
  artPrescriptionID!: string
  drugID!: string
  noOfPills!: number
  frequency!: number
  refillDate!: Date
  nextRefillDate!: Date
  expectedNoOfPills!: number
  computedNoOfPills!: number
  updatedAtExpectedNoOfPills!: Date
}

Prescription.init(
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
      }
    },
    patientVisitID: {
      type: DataTypes.UUID,
      references: {
        model: 'patientVisits',
        key: 'id'
      }
    },
    drugID: {
      type: DataTypes.UUID,
      references: {
        model: 'arts',
        key: 'id'
      }
    },
    artPrescriptionID: {
      type: DataTypes.UUID,
      references: {
        model: 'artPrescriptions',
        key: 'id'
      }
    },
    noOfPills: {
      type: DataTypes.STRING
    },
    frequency: {
      type: DataTypes.INTEGER
    },
    refillDate: {
      type: DataTypes.DATE
    },
    nextRefillDate: {
      type: DataTypes.DATE
    },
    expectedNoOfPills: {
      type: DataTypes.STRING
    },
    computedNoOfPills: {
      type: DataTypes.INTEGER
    },
    updatedAtExpectedNoOfPills: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize: connect,

    tableName: 'prescriptions'
  }
)

Prescription.belongsTo(Patient, { foreignKey: 'patientID' })
Prescription.belongsTo(PatientVisits, { foreignKey: 'patientVisitID' })
Prescription.belongsTo(ART, { foreignKey: 'drugID' })
Prescription.belongsTo(ARTPrescription, { foreignKey: 'artPrescriptionID' })

void connect.sync().then(async () => {
  console.log('Prescription table created successfully!!')
})

// export { Caregiver }
