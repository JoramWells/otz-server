/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model, Sequelize, UUIDV4 } from 'sequelize'
import { connect } from '../../db/connect'
import { Patient } from '../patients.models'
import { ART } from './art.model'
import { PatientVisits } from '../patientVisits.model'
import { ARTPrescription } from './artPrescription.model'
import { PrescriptionInterface } from 'otz-types'


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
  createdAt!: Date
  updatedAt!: Date
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
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  },
  {
    sequelize: connect,

    tableName: 'prescriptions'
  }
)

// const disableForeignKeyChecksQuery = 'SET FOREIGN_KEY_CHECKS = 0;'
// void connect.query(disableForeignKeyChecksQuery)

Prescription.belongsTo(Patient, {
  foreignKey: 'patientID',
  constraints: false
})
Prescription.belongsTo(PatientVisits, {
  foreignKey: 'patientVisitID',
  constraints: false
})
Prescription.belongsTo(ART, { foreignKey: 'drugID', constraints: false })
Prescription.belongsTo(ARTPrescription, {
  foreignKey: 'artPrescriptionID',
  constraints: false
})

// void connect
//   .sync({alter: true })
//   .then(async () => {
//     console.log('Prescription table created successfully!!')
//   })

// export { Caregiver }
