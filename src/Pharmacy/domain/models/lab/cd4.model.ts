import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";

import { CD4Interface } from "otz-types";
import { connect } from "../../db/connect";
import { User } from "../user.model";
import { Patient } from "../patients.models";

// import { type PatientEntity } from '../entities/PatientEntity'


export class CD4
  extends Model<CD4Interface>
  implements CD4Interface
{
  id!: string;
patientID?: string | undefined;
patientVisitID?: string | undefined;
hospitalID?: string | undefined;
baselineCD4?: string | undefined;
CD4Count?: string | undefined;
lastCD4Date?: string | undefined;
currentCD4Date?: string | Date | undefined;
}

CD4.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    patientID: {
      type: DataTypes.INTEGER,
      references: {
        model: "patients",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    hospitalID: {
      type: DataTypes.UUID,
      references: {
        model: "hospitals",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    // CD4
    baselineCD4: {
      type: DataTypes.STRING,
    },
    CD4Count: {
      type: DataTypes.STRING,
    },
    currentCD4Date: {
      type: DataTypes.DATEONLY,
    },
    lastCD4Date: {
      type: DataTypes.DATEONLY,
    },
  },

  {
    sequelize: connect,
    tableName: "cd4",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);


CD4.belongsTo(User, { foreignKey: "userID" });
CD4.belongsTo(Patient, { foreignKey: "patientID" });

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