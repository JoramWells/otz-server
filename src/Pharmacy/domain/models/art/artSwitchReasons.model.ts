/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { connect } from '../../db/connect'
import { ARTSwitchReasonInterface } from 'otz-types'



export class ARTSwitchReason extends Model<ARTSwitchReasonInterface> {
  id!: string
  reason!: string
}

ARTSwitchReason.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connect,

    tableName: "artSwitchReasons",
  }
);

// sequelize.sync()
// console.log('User Table synced successfully')

// export { Caregiver }
