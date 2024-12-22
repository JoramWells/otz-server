import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";
import { TransferInInterface } from "otz-types";
import { Patient } from "../patients.models";
import { Hospital } from "../hospital/hospital.model";
import { connect } from "../../db/connect";
import { User } from "../user/user.model";
import { TransferOut } from "./transferOut.model";
// import { type PatientEntity } from '../entities/PatientEntity'

export class TransferIn
  extends Model<TransferInInterface>
  implements TransferInInterface
{
  id: string | undefined;
  transferInDate?: string | Date | undefined;
  transferInEffectiveDate?: string | Date | undefined;
  transferInVerificationDate?: string | Date | undefined;
  transferInVerified?: boolean | undefined;
  hospitalID?: string | undefined;
  transferOutID?: string | undefined;
  confirmedBy?: string | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

TransferIn.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    confirmedBy: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: true,
    },
    transferInDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    transferInEffectiveDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    transferInVerified: {
      type: DataTypes.BOOLEAN,
    },
    transferInVerificationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    transferOutID: {
      type: DataTypes.UUID,
      references: {
        model: "transferOuts",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize: connect,
    tableName: "transferIns",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

TransferIn.belongsTo(TransferOut, { foreignKey: "transferOutID" });
TransferIn.belongsTo(User, { foreignKey: "confirmedBy" });
// TransferIn.belongsTo(Hospital, { foreignKey: "hospitalID" });

// (async () => {
void connect.sync()
console.log('User Availability Table synced successfully')
// })()
