import { DataTypes, Model,  UUIDV4 } from "sequelize";
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

export interface MMASAttributes {
  id?: string;
  patientID: string;
  patientVisitID: string;
  isForget: boolean;
  isCareless: boolean;
  isQuitFeelWorse: boolean;
  isQuitFeelBetter: boolean;
  isTookMedYesterday: boolean;
  isQuitOutControl: boolean;
  isUnderPressure: boolean;
  difficultyRemembering: string;
}

export class MMAS extends Model<MMASAttributes> implements MMASAttributes {
  id: string | undefined;
  patientID!: string;
  patientVisitID!: string;
  isForget!: boolean;
  isCareless!: boolean;
  isQuitFeelWorse!: boolean;
  isQuitFeelBetter!: boolean;
  isTookMedYesterday!: boolean;
  isQuitOutControl!: boolean;
  isUnderPressure!: boolean;
  difficultyRemembering!: string;
}

MMAS.init(
  {
id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  patientID: {
    type: DataTypes.UUID,
    references: {
      model: 'patients',
      key: 'id',
    },
  },
  patientVisitID: {
    type: DataTypes.UUID,
    references: {
      model: 'patientVisits',
      key: 'id',
    },
  },
  isForget: {
    type: DataTypes.BOOLEAN,
  },
  isCareless: {
    type: DataTypes.BOOLEAN,
  },
  isQuitFeelWorse: {
    type: DataTypes.BOOLEAN,
  },
  isQuitFeelBetter: {
    type: DataTypes.BOOLEAN,
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
  },
  {
    sequelize: connect,
    tableName: "mmas",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

MMAS.belongsTo(Patient, { foreignKey: "patientID" });
MMAS.belongsTo(PatientVisits, { foreignKey: "patientVisitID" });

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()