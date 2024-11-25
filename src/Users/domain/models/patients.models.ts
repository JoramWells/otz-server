import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";
import { School } from "./school/school.model";
import { Hospital } from "./hospital/hospital.model";
import { connect } from "../db/connect";
import { createClient } from "redis";
import { LocationProps, PatientAttributes } from "otz-types";
import bcrypt from "bcrypt";
import { User } from "./user.model";

// import { type PatientEntity } from '../entities/PatientEntity'
export enum PatientRoles {
  Admin = "admin",
  Clinician = "clinician",
  MentorMother = "mentor mother",
  AYPAdvocate = "ayp advocate",
  Nurse = "nurse",
  patient = "patient",
}

export interface PatientResponseInterface {
  data: PatientAttributes[];
  total: number;
  page: number;
  pageSize: number;
}

export class Patient
  extends Model<PatientAttributes>
  implements PatientAttributes
{
  role!: PatientRoles;
  entryPoint?: string | undefined;
  maritalStatus!: string;
  id?: string | undefined;
  firstName?: string | undefined;
  middleName: string | undefined;
  lastName?: string | undefined;
  password?: string | undefined;
  username?: string | undefined;
  userID?: string | undefined;
  sex?: string | undefined;
  dob?: Date | string | undefined;
  avatar?: string | undefined;
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
    avatar: {
      type: DataTypes.STRING,
    },
    username: {
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
      type: DataTypes.INTEGER,
    },
    dateConfirmedPositive: {
      type: DataTypes.DATE,
    },
    initialRegimen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    NUPI: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    enrollmentDate: {
      type: DataTypes.DATE,
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
      type: DataTypes.UUID,
      references: {
        model: "hospitals",
        key: "id",
      },
      // allowNull: false,`
      onDelete: "CASCADE",
    },
    isImportant: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    location: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    userID: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      // onDelete: "SET NULL",
      onDelete: "CASCADE",
      allowNull: true,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM(...Object.values(PatientRoles)),
      defaultValue: PatientRoles.patient,
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

export async function generateDefaultHashedPassword(password: string) {
  // const password = "12345678";
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);
  return passwordHash;
}

Patient.beforeCreate(async (patient) => {
  patient.password = await generateDefaultHashedPassword("12345678");
});

Patient.afterUpdate(async (instance, options) => {
  const redisClient = createClient({ url: "redis://redis:6379" });
  await redisClient.connect();
  await redisClient.del("patientData");
});

Patient.afterCreate(async () => {
  const redisClient = createClient({ url: "redis://redis:6379" });
  await redisClient.connect();
  await redisClient.del("patientData");
});

Patient.belongsTo(School, { foreignKey: "schoolID" });
Patient.belongsTo(User, { foreignKey: "userID" });
Patient.belongsTo(Hospital, { foreignKey: "hospitalID" });

// const syncDB = async () => {
//   try {
//     // await disableForeignKeyChecks(connect)
//     return await connect.sync({ alter: { exclude: ['createdAt', 'updatedAt'] } })
//   } catch (error) {
//     console.log(error)
//   }
// }

// void syncDB()
// void connect.sync().then(async () => {
//   console.log("Patient table created successfully!!");
// });
