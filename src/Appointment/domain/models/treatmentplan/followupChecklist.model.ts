import { DataTypes, Model, UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { Patient } from "../patients.models";
import { PatientVisits } from "../patientVisits.model";
// import { type PatientEntity } from '../entities/PatientEntity'

enum DifficultyRemembering {
  Never = "never",
  Once = "once in a while",
  Sometimes = "sometimes",
  Usually = "usually",
  AllTime = "all the time",
}

export interface FollowUpChecklistAttributes {
  id?: string;
  patientID: string;
  patientVisitID: string;
  followUpDate: Date;
  bmi: number;
  tannerStaging: string;
  disclosure: string;
  adherenceCounselling: string;
  isPAMA: boolean;
  isOVC: boolean;
  isActiveSupportGroup: boolean;
  isVLValid: boolean;
  isOptimizationDone: boolean;
}

export class FollowUpChecklist
  extends Model<FollowUpChecklistAttributes>
  implements FollowUpChecklistAttributes
{
  disclosure!: string;
  tannerStaging!: string;
  bmi!: number;
  followUpDate!: Date;
  adherenceCounselling!: string;
  isPAMA!: boolean;
  isOVC!: boolean;
  isActiveSupportGroup!: boolean;
  isVLValid!: boolean;
  isOptimizationDone!: boolean;
  id: string | undefined;
  patientID!: string;
  patientVisitID!: string;
}

FollowUpChecklist.init(
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
    patientVisitID: {
      type: DataTypes.UUID,
      references: {
        model: "patients",
        key: "id",
      },
    },
    followUpDate: {
      type: DataTypes.STRING,
    },
    // 0867 + OTZ
    bmi: {
      type: DataTypes.STRING,
    },
    tannerStaging: {
      type: DataTypes.STRING,
    },
    disclosure: {
      type: DataTypes.STRING,
    },
    adherenceCounselling: {
      type: DataTypes.STRING,
    },
    isPAMA: {
      type: DataTypes.BOOLEAN,
    },
    isOVC: {
      type: DataTypes.STRING,
    },
    isActiveSupportGroup: {
      type: DataTypes.STRING,
    },
    isVLValid: {
      type: DataTypes.STRING,
    },
    isOptimizationDone: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connect,
    tableName: "followUpChecklist",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

FollowUpChecklist.belongsTo(Patient, { foreignKey: "patientID" });
FollowUpChecklist.belongsTo(PatientVisits, { foreignKey: "patientVisitID" });

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()