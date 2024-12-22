import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";
import { TransferOutInterface } from "otz-types";
import { Patient } from "../patients.models";
import { Hospital } from "../hospital/hospital.model";
import { connect } from "../../db/connect";
// import { type PatientEntity } from '../entities/PatientEntity'

export class TransferOut
  extends Model<TransferOutInterface>
  implements TransferOutInterface
{
  id: string | undefined;
patientID?: string | undefined;
transferOutDate?: string | Date | undefined;
transferOutEffectiveDate?: string | Date | undefined;
transferOutVerificationDate?: string | Date | undefined;
transferOutVerified?: boolean | undefined;
transferredTo?: string | undefined;
lastAppointmentDate?: string | Date | undefined;
lastVisitDate?: string | Date | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}

TransferOut.init(
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
    transferOutDate: {
      type: DataTypes.DATE,
    },
    transferOutEffectiveDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    transferOutVerified: {
      type: DataTypes.BOOLEAN,
    },
    transferOutVerificationDate: {
      type: DataTypes.DATE,
      allowNull: true

    },
    transferredTo: {
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
    tableName: "transferOuts",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

TransferOut.belongsTo(Patient, { foreignKey: "patientID" });
TransferOut.belongsTo(Hospital, { foreignKey: "transferredTo" });

// (async () => {
void connect.sync()
console.log('User2 Availability Table synced successfully')
// })()
