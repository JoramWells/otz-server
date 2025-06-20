import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { Patient } from "../patients.models";
import { PatientVisits } from "../patientVisits.model";
import { MMASFour } from "./mmas4.model";
import { MMASEightAttributes } from "otz-types";
import { connect } from "../../db/connect";
// import { type PatientEntity } from '../entities/PatientEntity'


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
      onDelete: "CASCADE",
    },
    patientVisitID: {
      type: DataTypes.UUID,
      references: {
        model: "patientVisits",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    mmasFourID: {
      type: DataTypes.UUID,
      references: {
        model: "mmasFour",
        key: "id",
      },
      onDelete: "CASCADE",
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
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize: connect,
    tableName: "mmasEight",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
    indexes: [
      { fields: ["mmasFourID"] },
      {
        fields: ["patientID"],
      },
      {
        fields: ["patientVisitID"],
      },
    ],
  }
);

MMASEight.belongsTo(MMASFour, { foreignKey: "mmasFourID" });
MMASEight.belongsTo(Patient, { foreignKey: "patientID" });
MMASEight.belongsTo(PatientVisits, { foreignKey: "patientVisitID" });

// (async () => {
// await connect.sync()
// console.log('MMAS 8 Table synced successfully!')
// })()
