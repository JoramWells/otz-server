/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4, Sequelize } from 'sequelize'
import { connect } from '../db/connect'
import { Patient } from './patients.models'
import { PatientSessionLogInterface } from 'otz-types'

export class PatientSessionLog extends Model<PatientSessionLogInterface> {
  patientID: string | undefined;
  id: string | undefined;
  connectedAt: Date | undefined;
  disconnectedAt: Date | undefined;
  duration: number | undefined;
}

PatientSessionLog.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    patientID: {
      type: DataTypes.UUID,
      references: {
        model: "patients",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false
    },
    connectedAt: {
      type: DataTypes.DATE,
    },
    disconnectedAt: {
      type: DataTypes.DATE,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize: connect,

    tableName: "patientSessionLogs",
  }
);

PatientSessionLog.belongsTo(Patient, { foreignKey: 'patientID' })

connect.sync()
// console.log('User Table synced successfully')

// export { Caregiver }
