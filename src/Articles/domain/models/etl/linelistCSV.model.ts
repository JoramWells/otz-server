import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { LineListCSVInterface } from "otz-types";
import { User } from "../user.model";
import { Hospital } from "../hospital/hospital.model";
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
      allowNull: false,
    },
    userID: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      // onDelete: "SET NULL",
      onDelete: "CASCADE",
      allowNull: true,
      // unique: true,
    },
    hospitalID: {
      type: DataTypes.UUID,
      references: {
        model: "hospitals",
        key: "id",
      },
      // allowNull: false,`
      onDelete: "CASCADE",
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



LineListCSV.belongsTo(User, { foreignKey: "userID" });
LineListCSV.belongsTo(Hospital, { foreignKey: "hospitalID" });
// (async () => {
void connect.sync()
console.log('Patient Table synced successfully')
// })()
