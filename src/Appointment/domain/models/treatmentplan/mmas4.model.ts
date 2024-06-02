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

export interface MMASFourAttributes {
  id?: string;
  patientID: string;
  patientVisitID: string;
  isForget: boolean;
  isCareless: boolean;
  isQuitFeelWorse: boolean;
  isQuitFeelBetter: boolean;
  totalScores: number;

}

export class MMASFour extends Model<MMASFourAttributes> implements MMASFourAttributes {
  id: string | undefined;
  patientID!: string;
  patientVisitID!: string;
  isForget!: boolean;
  isCareless!: boolean;
  isQuitFeelWorse!: boolean;
  isQuitFeelBetter!: boolean;
  totalScores!: number;
 
}

MMASFour.init(
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
  totalScores: {
    type: DataTypes.INTEGER,
  },
  },
  {
    sequelize: connect,
    tableName: "mmasFour",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

MMASFour.belongsTo(Patient, { foreignKey: "patientID" });
MMASFour.belongsTo(PatientVisits, { foreignKey: "patientVisitID" });

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
