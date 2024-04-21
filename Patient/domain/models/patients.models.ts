/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { School } from './school/school.model'
import { Hospital } from './hospital/hospital.model'
import { connect } from '../db/connect'

interface PatientAttributes {
  id?: string
  firstName: string
  middleName: string
  lastName?: string
  sex: string
  dob: string
  phoneNo: string
  idNo: string
  occupationID: string
  cccNo: string
  ageAtReporting: string
  dateConfirmedPositive: string
  initialRegimen: string
  populationType: string
  schoolID: string
  hospitalID: string
}

export class Patient extends Model<PatientAttributes> {}

Patient.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: true,
      defaultValue: UUIDV4
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
      type: DataTypes.DATEONLY
    },
    phoneNo: {
      type: DataTypes.STRING
    },
    occupationID: {
      type: DataTypes.UUID,
      allowNull: true
    },
    idNo: {
      type: DataTypes.STRING
    },
    cccNo: {
      type: DataTypes.STRING
    },
    // mflCode: {
    //   type: DataTypes.STRING,
    // },
    // residence: {
    //   type: DataTypes.STRING,
    // },

    ageAtReporting: {
      type: DataTypes.DATE
    },
    dateConfirmedPositive: {
      type: DataTypes.DATE
    },
    initialRegimen: {
      type: DataTypes.STRING,
      allowNull: true
    },
    populationType: {
      type: DataTypes.STRING
    },
    schoolID: {
      type: DataTypes.INTEGER
    },
    hospitalID: {
      type: DataTypes.INTEGER
    }
    // notifications: {
    //   type: DataTypes.JSONB,
    //   allowNull: true,
    //   defaultValue: {}
    // }
  },
  {
    sequelize: connect,
    tableName: 'patients',
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true
  }
)

Patient.belongsTo(School, { foreignKey: 'schoolID' })
Patient.belongsTo(Hospital, { foreignKey: 'hospitalID' })

// (async () => {
//   await sequelize.sync()
//   console.log('Patient Table synced successfully')
// })()
