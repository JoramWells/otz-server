import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { Patient } from "../patients.models";
import { PatientVisits } from "../patientVisits.model";
import { MMASFour } from "./mmas4.model";
// import { type PatientEntity } from '../entities/PatientEntity'

 enum DifficultyRemembering {
   Never = "never",
   Once = "once in a while",
   Sometimes = "sometimes",
   Usually = "usually",
   AllTime = "all the time",
 }

export interface MMASEightAttributes {
  id?: string;
  patientID: string;
  patientVisitID: string;
  mmasFourID?: string;
  isTookMedYesterday: boolean;
  isQuitOutControl: boolean;
  isUnderPressure: boolean;
  difficultyRemembering: string;
  totalScores: number;
}

export class MMASEight extends Model<MMASEightAttributes> implements MMASEightAttributes {
  id: string | undefined;
  patientID!: string;
  patientVisitID!: string;
  mmasFourID: string | undefined;
  isTookMedYesterday!: boolean;
  isQuitOutControl!: boolean;
  isUnderPressure!: boolean;
  isQuitFeelBetter!: boolean;
  difficultyRemembering!: string;
  totalScores!: number;
}

MMASEight.init(
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
        model: "patientVisits",
        key: "id",
      },
    },
    mmasFourID: {
      type: DataTypes.UUID,
      references: {
        model: "mmasFour",
        key: "id",
      },
    },
    isTookMedYesterday: {
      type: DataTypes.BOOLEAN,
    },
    isQuitOutControl: {
      type: DataTypes.BOOLEAN,
    },
    isUnderPressure: {
      type: DataTypes.BOOLEAN,
    },
    difficultyRemembering: {
      type: DataTypes.STRING,
    },
    totalScores: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: connect,
    tableName: "mmasEight",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

MMASEight.belongsTo(MMASFour, { foreignKey: "mmasFourID" });
MMASEight.belongsTo(Patient, { foreignKey: "patientID" });
MMASEight.belongsTo(PatientVisits, { foreignKey: "patientVisitID" });

// (async () => {
// connect.sync()
// console.log('MMAS 8 Table synced successfully')
// })()
