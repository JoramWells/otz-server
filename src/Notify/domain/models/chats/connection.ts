import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";

import { connect } from "../../../db/connect";
import { RequestsAttributes, RequestStatus } from "otz-types";
import { Patient } from "../patients.models";



export class Request extends Model<RequestsAttributes> implements RequestsAttributes {
  id?: string | undefined;
  // messages?: string | undefined;
  patientID: string | undefined;
  from: string | undefined;
  message!: string;
  status!: RequestStatus
}

Request.init(
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
    },
    from: {
      type: DataTypes.UUID,
      references: {
        model: "patients",
        key: "id",
      },
    },
    message: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(RequestStatus)),
      allowNull: false,
      defaultValue: RequestStatus.Pending
    },
  },
  {
    sequelize: connect,
    tableName: "requests",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

Request.belongsTo(Patient, { foreignKey: "from" });
Request.belongsTo(Patient, { foreignKey: "patientID" });


// (async () => {
// void connect.sync()
// console.log('Patient Table synced successfully')
// })()
