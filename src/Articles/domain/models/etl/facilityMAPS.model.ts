import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import {  FacilityMAPSInterface } from "otz-types";
import { LineListCSV } from "./linelistCSV.model";
// import { type PatientEntity } from '../entities/PatientEntity'


export interface FacilityMAPSDetailsInterface {
  id: string;
  ageGroup: string;
  gender: string;
  regimenLine: string;
  regimen: string;
  count: number;
}

export class FacilityMAPS
  extends Model<FacilityMAPSInterface>
  implements FacilityMAPSInterface
{
  id!: string;
  lineListID?: string | undefined;
  details!: FacilityMAPSDetailsInterface;
}

FacilityMAPS.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    lineListID: {
      type: DataTypes.UUID,
      references: {
        model: "LineListCSV",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    details: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize: connect,
    tableName: "FacilityMAPS",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);


// (async () => {
// void connect.sync({alter:true})
// console.log('Patient Table synced successfully')
// })()

FacilityMAPS.belongsTo(LineListCSV, { foreignKey: "lineListID" });
