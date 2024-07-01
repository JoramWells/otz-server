import { DataTypes, ForeignKey, InferAttributes, Model,  Optional,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { TimeAndWork } from "./timeAndWork.model";
// import { type PatientEntity } from '../entities/PatientEntity'
import { UptakeAttributes } from "otz-types";


type UptakeCreationAttributes = Optional<UptakeAttributes, 'id'>

export class Uptake extends Model<UptakeAttributes> implements UptakeAttributes {
  id: string | undefined;
  // timeAndWorkID!: string;
  currentDate!: string;
  morningStatus!: boolean;
  eveningStatus!: boolean;

  declare timeAndWorkID: ForeignKey<TimeAndWork["id"]>;
}

Uptake.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    timeAndWorkID: {
      type: DataTypes.UUID,
      references: {
        model: "timeAndWork",
        key: "id",
      },
    },
    currentDate: {
      type: DataTypes.DATE,
    },
    morningStatus: {
      type: DataTypes.BOOLEAN,
    },
    eveningStatus: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize: connect,
    tableName: "uptake",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

Uptake.belongsTo(TimeAndWork, { foreignKey: "timeAndWorkID", as:'TimeAndWork' });

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
