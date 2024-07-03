/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { Patient } from './patients.models'
import { connect } from '../../db/connect'

export interface PatientVisitsInterface {
  id?: string
  patientID?: string

}

export class PatientVisits extends Model<PatientVisitsInterface> {
  patientID: string | undefined
  id: string | undefined
}

PatientVisits.init(
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
    }

  },
  {
    sequelize: connect,

    tableName: 'patientVisits'
  }
)

PatientVisits.belongsTo(Patient, { foreignKey: 'patientID' })

// connect.sync()
// console.log('User Table synced successfully')

// export { Caregiver }
