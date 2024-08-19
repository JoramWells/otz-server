import { DataTypes, Model, Sequelize, UUIDV4 } from 'sequelize'
import { School } from './school/school.model'
import { Hospital } from './hospital/hospital.model'
import { connect } from '../db/connect'
import { createClient } from 'redis'
import { LocationProps, PatientAttributes } from 'otz-types'
import bcrypt from 'bcrypt'

// import { type PatientEntity } from '../entities/PatientEntity'
export enum UserRoles {
  Admin = "admin",
  Clinician = "clinician",
  MentorMother = "mentor mother",
  AYPAdvocate = "ayp advocate",
  Nurse = "nurse",
  patient = "patient",
}

export class Patient extends Model<PatientAttributes> implements PatientAttributes {
  role!: UserRoles;
  entryPoint?: string | undefined;
  maritalStatus!: string;
  id?: string | undefined;
  firstName?: string | undefined;
  middleName: string | undefined;
  lastName?: string | undefined;
  password?: string | undefined;
  sex?: string | undefined;
  dob?: Date | string | undefined;
  phoneNo?: string | undefined;
  idNo?: string | undefined;
  occupationID?: string | undefined;
  cccNo?: string | undefined;
  ageAtReporting?: string | undefined;
  dateConfirmedPositive?: string | undefined;
  initialRegimen?: string | undefined;
  isImportant?: boolean | undefined;
  populationType?: string | undefined;
  schoolID?: string | undefined;
  hospitalID?: string | undefined;
  subCountyName?: string | undefined;
  location: LocationProps | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

Patient.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: true,
      defaultValue: UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    middleName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    sex: {
      type: DataTypes.STRING,
    },
    dob: {
      type: DataTypes.DATE,
    },
    phoneNo: {
      type: DataTypes.STRING,
      defaultValue: "",
      unique: false,
    },
    occupationID: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    idNo: {
      type: DataTypes.STRING,
    },
    cccNo: {
      type: DataTypes.STRING,
    },
    entryPoint: {
      type: DataTypes.STRING,
    },
    subCountyName: {
      type: DataTypes.STRING,
    },

    ageAtReporting: {
      type: DataTypes.STRING,
    },
    dateConfirmedPositive: {
      type: DataTypes.DATE,
    },
    initialRegimen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    populationType: {
      type: DataTypes.STRING,
      defaultValue: "General Population",
    },
    maritalStatus: {
      type: DataTypes.STRING,
      defaultValue: "N/A",
    },
    schoolID: {
      type: DataTypes.INTEGER,
    },
    hospitalID: {
      type: DataTypes.INTEGER,
    },
    isImportant: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    location: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(UserRoles)),
      defaultValue: UserRoles.patient,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    password: {
      type: DataTypes.TEXT,
      defaultValue: "N/A",
    },
  },

  {
    sequelize: connect,
    tableName: "patients",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

async function generateDefaultHashedPassword() {
  const password = "12345678";
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  console.log(passwordHash, "as");
  return passwordHash;
}

Patient.beforeCreate(async(patient)=>{
  patient.password = await generateDefaultHashedPassword()
})

Patient.afterUpdate(async (instance, options) => {
  const redisClient = createClient({ url: 'redis://redis:6379' })
  await redisClient.connect()
  await redisClient.del('patientData')
})

Patient.afterCreate(async () => {
  const redisClient = createClient({ url: 'redis://redis:6379' })
  await redisClient.connect()
  await redisClient.del('patientData')
})

Patient.belongsTo(School, { foreignKey: 'schoolID' })
Patient.belongsTo(Hospital, { foreignKey: 'hospitalID', constraints: false })

// const syncDB = async () => {
//   try {
//     // await disableForeignKeyChecks(connect)
//     return await connect.sync({ alter: { exclude: ['createdAt', 'updatedAt'] } })
//   } catch (error) {
//     console.log(error)
//   }
// }

// void syncDB()

// (async () => {
// console.log('Patient Table synced successfully')
// })()
