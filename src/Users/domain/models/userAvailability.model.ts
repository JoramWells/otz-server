import { DataTypes, Model, Sequelize, UUIDV4 } from 'sequelize'
import { connect } from '../db/connect'
import { User } from './user.model'
import { UserAvailabilityAttributes } from 'otz-types'
// import { type PatientEntity } from '../entities/PatientEntity'

export class UserAvailability
  extends Model<UserAvailabilityAttributes>
  implements UserAvailabilityAttributes
{
  id: string | undefined;
  userID!: string;
  availability?: {
    available: boolean;
    day: string;
    startTime: Date;
    endTime: Date;
  }[];
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
}


UserAvailability.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    userID: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false
    },
    availability: {
      type: DataTypes.JSONB,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize: connect,
    tableName: "userAvailability",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

UserAvailability.belongsTo(User, { foreignKey: 'userID' })

// (async () => {
// void connect.sync({ alter: true })
// console.log('User Availability Table synced successfully')
// })()
