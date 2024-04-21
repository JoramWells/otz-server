/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { Patient } from './patients.models'
import { User } from './user.model'
import { connect } from '../db/connect'

interface CaseManagerInterface {
  id?: string
  patientID: string
  userID: string
  isNotification: boolean
}

export class CaseManager extends Model<CaseManagerInterface> {}

CaseManager.init(
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
    userID: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    isNotification: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    tableName: 'caseManagers',
    sequelize: connect
  }
)

CaseManager.belongsTo(Patient, { foreignKey: 'patientID' })
CaseManager.belongsTo(User, { foreignKey: 'userID' })

// sequelize.sync()
// console.log('User Table synced successfully')

export default CaseManager
