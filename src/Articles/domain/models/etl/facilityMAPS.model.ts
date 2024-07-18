import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { FacilityMAPSInterface } from "otz-types";
import { LineListCSV } from "../articles/linelistCSV.model";
// import { type PatientEntity } from '../entities/PatientEntity'



export class FacilityMAPS
  extends Model<FacilityMAPSInterface>
  implements FacilityMAPSInterface
{
  id!: string;
  ageGroup!: string;
  gender!: string;
  regimenLine!: string;
  regimen!: string;
  lineListID?: string | undefined;
  count!: number;
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
    ageGroup: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    regimenLine: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    regimen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    count: {
      type: DataTypes.INTEGER,
      // allowNull: false,
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
void connect.sync({alter:true})
// console.log('Patient Table synced successfully')
// })()

FacilityMAPS.belongsTo(LineListCSV, { foreignKey: "lineListID" });
