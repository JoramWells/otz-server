/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { AppModuleSessionInterface } from "otz-types";



// AppModules.belongsTo(Comment_type, { foreignKey: 'comment_type_id' });
export class AppModuleSession
  extends Model<AppModuleSessionInterface>
  implements AppModuleSessionInterface
{
  id!: string;
  title?: string | undefined;
  description!: string;
  link!: string;
  isActive!: boolean;
  img?: string | undefined;
}

AppModuleSession.init(
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
      allowNull: false,
    },
    appModuleID: {
      type: DataTypes.UUID,
      references: {
        model: "appModules",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
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
    tableName: "appModuleSessions",
  }
);
