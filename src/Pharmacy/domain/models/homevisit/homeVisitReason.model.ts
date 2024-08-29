import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";

import { HomeVisitReasonAttributes } from "otz-types";
import { connect } from "../../db/connect";

export class HomeVisitReason
  extends Model<HomeVisitReasonAttributes>
  implements HomeVisitReasonAttributes
{
  id?: string | undefined;
  homeVisitReasonDescription?: string | undefined;
}

HomeVisitReason.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    homeVisitReasonDescription: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connect,
    tableName: "homeVisitReasons",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

// Patient.belongsTo(Hospital, { foreignKey: 'hospitalID' })

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
