import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";

import { connect } from "../../../db/connect";
import { FriendRequestsAttributes  } from "otz-types";
import { Patient } from "../patients.models";

export enum FriendRequestStatus {
  Pending = "pending",
  Accepted = "accepted",
  Rejected = "rejected",
}

export class FriendRequest extends Model<FriendRequestsAttributes> implements FriendRequestsAttributes {
  id?: string | undefined;
  // messages?: string | undefined;
  patientID: string | undefined;
  from: string | undefined;
  message!: string;
  status!: FriendRequestStatus
}

FriendRequest.init(
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
      allowNull:false
    },
    from: {
      type: DataTypes.UUID,
      references: {
        model: "patients",
        key: "id",
      },
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(FriendRequestStatus)),
      allowNull: false,
      defaultValue: FriendRequestStatus.Pending,
    },
  },
  {
    sequelize: connect,
    tableName: "friendRequests",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

FriendRequest.belongsTo(Patient, { foreignKey: "from" });
FriendRequest.belongsTo(Patient, { foreignKey: "patientID" });


// (async () => {
// void connect.sync()
// console.log('Patient Table synced successfully')
// })()
