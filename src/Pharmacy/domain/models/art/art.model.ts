/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { connect } from '../../db/connect'
import { ArtCategory } from './artCategory.model'
import { MeasuringUnit } from './measuringUnit.model'
import { ARTInterface } from 'otz-types'


export class ART extends Model<ARTInterface> {
  id!: string
  artName!: string
  artCategoryID!: string
  measuringUnitID!: string
  quantity!: number
  expiryDate!: Date
}

ART.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    artName: {
      type: DataTypes.STRING
    },
    artCategoryID: {
      type: DataTypes.UUID,
      references: {
        model: 'artCategories',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    measuringUnitID: {
      type: DataTypes.UUID,
      references: {
        model: 'measuringUnits',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    expiryDate: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize: connect,

    tableName: 'arts'
  }
)

ART.belongsTo(ArtCategory, { foreignKey: 'artCategoryID' })
ART.belongsTo(MeasuringUnit, { foreignKey: 'measuringUnitID' })

// sequelize.sync()
// console.log('User Table synced successfully')

// export { Caregiver }
