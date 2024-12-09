import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";

import { LabSpecimenInterface } from "otz-types";
import { connect } from "../../db/connect";
import { User } from "../user.model";
import { Patient } from "../patients.models";

// import { type PatientEntity } from '../entities/PatientEntity'


export class LabSpecimen
  extends Model<LabSpecimenInterface>
  implements LabSpecimenInterface
{
  id!: string;
  specimenDescription?: string | undefined;
}

LabSpecimen.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    specimenDescription: {
      type: DataTypes.STRING,
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


LabSpecimen.belongsTo(User, { foreignKey: "userID" });
LabSpecimen.belongsTo(Patient, { foreignKey: "patientID" });

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