/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4, Sequelize } from 'sequelize'
import { connect } from '../db/connect'
import { User } from './user/user.model';
import { UserSessionLogInterface } from 'otz-types';

export class UserSessionLog extends Model<UserSessionLogInterface> {
  patientID: string | undefined;
  id: string | undefined;
  connectedAt: Date | undefined;
  disconnectedAt: Date | undefined;
  duration: number | undefined;
}

UserSessionLog.init(
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
    connectedAt: {
      type: DataTypes.DATE,
    },
    disconnectedAt: {
      type: DataTypes.DATE,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize: connect,

    tableName: "userSessionLogs",
  }
);

UserSessionLog.belongsTo(User, { foreignKey: 'userID' })

// connect.sync()
// console.log('User Table synced successfully')

// export { Caregiver }
