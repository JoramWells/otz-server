import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { Patient } from "../patients.models";
import { PatientVisits } from "../patientVisits.model";
import { MMASFourAttributes } from "otz-types";
import { connect } from "../../db/connect";
// import { type PatientEntity } from '../entities/PatientEntity'


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
    indexes: [
      {
        fields: ["patientID"],
      },
      {
        fields: ["patientVisitID"],
      },
    ],
  }
);

MMASFour.belongsTo(Patient, { foreignKey: "patientID" });
MMASFour.belongsTo(PatientVisits, { foreignKey: "patientVisitID" });

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully!!')
// })()
