import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";
import { TransferInInterface } from "otz-types";
import { Patient } from "../patients.models";
import { Hospital } from "../hospital/hospital.model";
import { connect } from "../../db/connect";
// import { type PatientEntity } from '../entities/PatientEntity'

export class TransferIn
  extends Model<TransferInInterface>
  implements TransferInInterface
{
  id: string | undefined;
  patientID?: string | undefined;
  transferInDate?: string | Date | undefined;
  transferInEffectiveDate?: string | Date | undefined;
  transferInVerificationDate?: string | Date | undefined;
  transferInVerified?: boolean | undefined;
  transferredFrom?: string | undefined;
  lastAppointmentDate?: string | Date | undefined;
  lastVisitDate?: string | Date | undefined;
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
    patientID: {
      type: DataTypes.UUID,
      references: {
        model: "patients",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    transferInDate: {
      type: DataTypes.DATE,
    },
    transferInEffectiveDate: {
      type: DataTypes.DATE,
    },
    transferInVerified: {
      type: DataTypes.BOOLEAN,
    },
    transferInVerificationDate: {
      type: DataTypes.DATE,
    },
    transferredFrom: {
      type: DataTypes.UUID,
      references: {
        model: "hospitals",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    lastAppointmentDate: {
      type: DataTypes.DATE,
    },
    lastVisitDate: {
      type: DataTypes.DATE,
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

TransferIn.belongsTo(Patient, { foreignKey: "patientID" });
TransferIn.belongsTo(Hospital, { foreignKey: "transferredFrom" });

// (async () => {
void connect.sync()
console.log('User Availability Table synced successfully')
// })()
