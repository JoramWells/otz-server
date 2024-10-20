/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { AgeLine, ArtCategoryInterface, ArtPhase } from 'otz-types'
import { connect } from '../../../db/connect'



export class ArtCategory extends Model<ArtCategoryInterface> {
  id!: string
  artCategoryDescription!: string
  ageLine!: AgeLine
  artPhase!: ArtPhase
}

ArtCategory.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    artCategoryDescription: {
      type: DataTypes.STRING
    },
    ageLine: {
      type: DataTypes.ENUM('pediatric', 'Adults'),
      defaultValue: 'pediatric'

      // allowNull: false
    },
    artPhase: {
      type: DataTypes.ENUM('first line', 'second line', 'third line'),
      defaultValue: 'first line'
      // allowNull: false
    }
  },
  {
    sequelize: connect,

    tableName: 'artCategories'
  }
)

// void connect.sync({ alter: true }).then(async () => {
//   console.log('Art table synced successfully!!')
// })

// export { Caregiver }
