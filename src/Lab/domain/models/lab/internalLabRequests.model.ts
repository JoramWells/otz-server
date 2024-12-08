import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";

import { InternalLabRequestInterface } from "otz-types";
import { connect } from "../../db/connect";
import { User } from "../user.model";
import { Patient } from "../patients.models";

// import { type PatientEntity } from '../entities/PatientEntity'


export class InternalLabRequest
  extends Model<InternalLabRequestInterface>
  implements InternalLabRequestInterface
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

InternalLabRequest.init(
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
      allowNull: false,
    },
    specimenType: {
      type: DataTypes.STRING,
    },
    testName: {
      type: DataTypes.STRING,
    },
    urgency: {
      type: DataTypes.STRING,
    },
    normalValues: {
      type: DataTypes.STRING,
    },
    dateRequested: {
      type: DataTypes.DATE,
    },
    reason: {
      type: DataTypes.STRING,
    },
    results: {
      type: DataTypes.STRING,
    },
    resultDate: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  },

  {
    sequelize: connect,
    tableName: "internalLabRequests",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);


InternalLabRequest.belongsTo(User, { foreignKey: "userID" });
InternalLabRequest.belongsTo(Patient, { foreignKey: "patientID" });

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