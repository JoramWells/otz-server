import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { EnhancedAdherenceAttributes } from "otz-types";
import { Prescription } from "../art/prescription.model";
import { connect } from "../../db/connect";
// import { type PatientEntity } from '../entities/PatientEntity'

export enum AdherenceImpression {
  Excellent = "excellent",
  Unsure = "unsure",
  Inadequate = "inadequate",
}

export class EnhancedAdherence extends Model<EnhancedAdherenceAttributes> implements EnhancedAdherenceAttributes {
  id: string | undefined;
  prescriptionID!: string;
  treatmentMotivation!: string;
  date!: Date | string;
  adherencePercentage!: number;
  mmas8Score!: number;
  barriersToAdherence!: string;
  impression!: AdherenceImpression;
  plan!: string;
  nextAppointmentDate!: Date | string;
}

EnhancedAdherence.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    prescriptionID: {
      type: DataTypes.UUID,
      references: {
        model: "prescriptions",
        key: "id",
      },
      allowNull: false,
    },

    treatmentMotivation: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
    adherencePercentage: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    mmas8Score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    barriersToAdherence: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    impression: {
      type: DataTypes.ENUM(...Object.values(AdherenceImpression)),
      allowNull: false,
      defaultValue: AdherenceImpression.Excellent
    },
    plan: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    nextAppointmentDate: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: connect,
    tableName: "enhancedAdherence",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
    indexes: [
      { fields: ["prescriptionID"] },
    ],
  }
);

EnhancedAdherence.belongsTo(Prescription, { foreignKey: "prescriptionID" });

// (async () => {
// connect.sync()
// console.log('MMAS 8 Table synced successfully')
// })()
