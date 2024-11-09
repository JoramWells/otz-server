/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */

/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { AppModuleInterface } from "otz-types";



// AppModules.belongsTo(Comment_type, { foreignKey: 'comment_type_id' });
export class AppModule
  extends Model<AppModuleInterface>
  implements AppModuleInterface
{
  id!: string;
  title?: string | undefined;
  description!: string;
  link!: string;
  isActive!: boolean;
  img?: string | undefined;
}

AppModule.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,

      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: { type: DataTypes.STRING, allowNull: false },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    sequelize: connect,
    tableName: "appModules",
  }
);
