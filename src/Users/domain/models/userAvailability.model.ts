import { DataTypes, Model, Sequelize, UUIDV4 } from 'sequelize'
import { connect } from '../db/connect'
import { User } from './user.model'
// import { type PatientEntity } from '../entities/PatientEntity'

export interface WeekDays {
  Monday: boolean
  Tuesday: boolean
  Wednesday: boolean
  Thursday: boolean
  Friday: boolean
  Saturday: boolean
  Sunday: boolean
}

export interface UserAvailabilityAttributes {
  id?: string
  userID: string
  daysAvailable: WeekDays
  startTime: Date
  endTime: Date
  createdAt?: Date
  updatedAt?: Date
}

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
// connect.sync({ alter: true })
// console.log('User Availability Table synced successfully')
// })()
