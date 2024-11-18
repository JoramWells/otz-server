import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";

import { ViralLoadInterface } from "otz-types";
import { connect } from "../../db/connect";
import { User } from "../user.model";
import { Patient } from "../patients.models";

// import { type PatientEntity } from '../entities/PatientEntity'


export class ViralLoad
  extends Model<ViralLoadInterface>
  implements ViralLoadInterface
{
  id?: string | undefined;
}

ViralLoad.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    vlResults: {
      type: DataTypes.INTEGER,
    },
    isVLValid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    patientVisitID: {
      type: DataTypes.UUID,
      references: {
        model: "patientVisits",
        key: "id",
      },
      onDelete: "CASCADE",
      unique: true,
      allowNull: false,
    },
    patientID: {
      type: DataTypes.UUID,
      references: {
        model: "patients",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
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
    vlJustification: {
      type: DataTypes.STRING,
    },
    dateOfVL: {
      type: DataTypes.DATE,
    },
    dateOfNextVL: {
      type: DataTypes.DATE,
    },
  },

  {
    sequelize: connect,
    tableName: "viralLoads",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);


ViralLoad.belongsTo(User, { foreignKey: "userID" });
ViralLoad.belongsTo(Patient, { foreignKey: "patientID" });

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