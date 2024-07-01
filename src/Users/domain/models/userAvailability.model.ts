import { DataTypes, Model, Sequelize, UUIDV4 } from 'sequelize'
import { connect } from '../db/connect'
import { User } from './user.model'
import { UserAvailabilityAttributes, WeekDays } from 'otz-types'
// import { type PatientEntity } from '../entities/PatientEntity'

export class UserAvailability
  extends Model<UserAvailabilityAttributes>
  implements UserAvailabilityAttributes {
  id: string | undefined
  userID!: string
  daysAvailable!: WeekDays
  startTime!: Date
  endTime!: Date
  createdAt: Date | undefined
  updatedAt: Date | undefined
}

UserAvailability.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    userID: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    daysAvailable: {
      type: DataTypes.JSONB
    },
    startTime: {
      type: DataTypes.TIME
    },
    endTime: {
      type: DataTypes.TIME,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
  },
  {
    sequelize: connect,
    tableName: 'userAvailability',
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true
  }
)

UserAvailability.belongsTo(User, { foreignKey: 'userID' })

// (async () => {
// void connect.sync({ alter: true })
// console.log('User Availability Table synced successfully')
// })()
