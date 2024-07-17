import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { LineListCSVInterface } from "otz-types";
// import { type PatientEntity } from '../entities/PatientEntity'



export class LineListCSV
  extends Model<LineListCSVInterface>
  implements LineListCSVInterface
{
  id!: string;
  file!: string;
}

LineListCSV.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },


    file: {
      type: DataTypes.STRING,
      allowNull:false

    },
  },
  {
    sequelize: connect,
    tableName: "LineListCSV",
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
