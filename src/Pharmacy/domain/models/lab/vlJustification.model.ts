import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";

import { VLReasonsInterface } from "otz-types";
import { connect } from "../../db/connect";
import { User } from "../user.model";
import { Patient } from "../patients.models";

// import { type PatientEntity } from '../entities/PatientEntity'


export class VLJustification
  extends Model<VLReasonsInterface>
  implements VLReasonsInterface
{
  id!: string;
  isVLValid!: boolean;
  vlResults!: number;
  patientID!: string;
  patientVisitID!: string;
  userID!: string;
  vlJustification!: string;
  dateOfVL?: string | Date | undefined;
  dateOfNextVL?: string | Date | undefined;
}

VLJustification.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    justification: {
      type: DataTypes.STRING,
    },
  },

  {
    sequelize: connect,
    tableName: "vlJustifications",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);



// const syncDB = async () => {
//   try {
//     // await disableForeignKeyChecks(connect)
//     return await connect.sync({ alter: { exclude: ['createdAt', 'updatedAt'] } })
//   } catch (error) {
//     console.log(error)
//   }
// }
connect.sync()
// void syncDB()
// void connect.sync().then(async () => {
//   console.log("Patient table created successfully!!");
// });