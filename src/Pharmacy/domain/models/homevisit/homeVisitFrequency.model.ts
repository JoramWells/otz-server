import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";

import { HomeVisitFrequencyAttributes } from "otz-types";
import { connect } from "../../db/connect";

export class HomeVisitFrequency
  extends Model<HomeVisitFrequencyAttributes>
  implements HomeVisitFrequencyAttributes
{
  id?: string | undefined;
  homeVisitFrequencyDescription?: string | undefined;
}

HomeVisitFrequency.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    homeVisitFrequencyDescription: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connect,
    tableName: "homeVisitFrequencies",
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
