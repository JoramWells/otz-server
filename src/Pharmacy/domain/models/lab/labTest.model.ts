import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";

import { LabTestCategoryInterface } from "otz-types";
import { connect } from "../../db/connect";
import { User } from "../user.model";
import { Patient } from "../patients.models";

// import { type PatientEntity } from '../entities/PatientEntity'


export class LabTest
  extends Model<LabTestCategoryInterface>
  implements LabTestCategoryInterface
{
  id!: string;
specimenID?: string | undefined;
categoryName?: string | undefined;
normalValues?: string | undefined;
}

LabTest.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    specimenID: {
      type: DataTypes.UUID,
      references: {
        model: "labSpecimens",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },

    reasons: {
      type: DataTypes.JSON,
      defaultValue: {},
    },
    normalValues: {
      type: DataTypes.STRING,
    },
  },

  {
    sequelize: connect,
    tableName: "labTests",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);


// LabTest.belongsTo(User, { foreignKey: "userID" });
// LabTest.belongsTo(Patient, { foreignKey: "patientID" });

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