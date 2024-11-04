/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { connect } from '../db/connect'
import { Patient } from './patients.models'
import { PatientVisitsInterface } from 'otz-types'
import { User } from './user.model'

export enum PatientVisitType {
  SelfCare = "self care",
  ClinicalEncounter = "clinical encounter",
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
      defaultValue: UUIDV4,
    },
    patientID: {
      type: DataTypes.UUID,
      references: {
        model: "patients",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    userID: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(...Object.values(PatientVisitType)),
      defaultValue: PatientVisitType.ClinicalEncounter,
      allowNull: false,
    },
  },
  {
    sequelize: connect,

    tableName: "patientVisits",
  }
);

PatientVisits.belongsTo(Patient, { foreignKey: 'patientID' })
PatientVisits.belongsTo(User, { foreignKey: "userID" });

// connect.sync()
// console.log('User Table synced successfully')

// export { Caregiver }
