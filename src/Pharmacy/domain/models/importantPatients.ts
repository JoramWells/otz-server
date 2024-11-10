import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";
import { ImportantPatientsInterface } from "otz-types";
import { User } from "./user.model";
import { Patient } from "./patients.models";
import { connect } from "../db/connect";

// import { type PatientEntity } from '../entities/PatientEntity'


export class ImportantPatient extends Model<ImportantPatientsInterface> implements ImportantPatientsInterface {
  id?: string | undefined;
  userID?: string | undefined;
  hospitalID?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

ImportantPatient.init(
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
      // allowNull: false,`
      onDelete: "CASCADE",
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
    tableName: "importantPatients",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);


ImportantPatient.belongsTo(User, { foreignKey: "userID" });
ImportantPatient.belongsTo(Patient, { foreignKey: "patientID" });

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