import { DataTypes, Model, UUIDV4 } from "sequelize";
import { TimeAndWork } from "./timeAndWork.model";
import { Prescription } from "../art/prescription.model";
import { connect } from "../../../db/connect";

// import { type PatientEntity } from '../entities/PatientEntity'

export interface UptakeAttributes {
  id?: string;
  timeAndWorkID: string;
  prescriptionID: string;
  currentDate: Date | string;
  morningStatus: boolean;
  eveningStatus: boolean;
}

export class Uptake
  extends Model<UptakeAttributes>
  implements UptakeAttributes
{
  id: string | undefined;
  timeAndWorkID!: string;
  prescriptionID!: string;
  currentDate!: Date | string;
  morningStatus!: boolean;
  eveningStatus!: boolean;
}

Uptake.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    timeAndWorkID: {
      type: DataTypes.UUID,
      references: {
        model: "timeAndWork",
        key: "id",
      },
    },
    prescriptionID: {
      type: DataTypes.UUID,
      references: {
        model: "prescriptions",
        key: "id",
      },
    },
    currentDate: {
      type: DataTypes.DATE,
    },
    morningStatus: {
      type: DataTypes.BOOLEAN,
    },
    eveningStatus: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize: connect,
    tableName: "uptake",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

Uptake.belongsTo(Prescription, { foreignKey: "prescriptionID" });
Uptake.belongsTo(TimeAndWork, { foreignKey: "timeAndWorkID" });

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
