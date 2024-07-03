/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { MeasuringUnitInterface } from 'otz-types'
import { connect } from '../../../db/connect'



export class MeasuringUnit extends Model<MeasuringUnitInterface> {
  id!: string
  description!: string
}

MeasuringUnit.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    description: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize: connect,

    tableName: 'measuringUnits'
  }
)

// sequelize.sync()
// console.log('User Table synced successfully')

// export { Caregiver }
