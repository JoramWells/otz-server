import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../../../db/connect";
import { ExecuteDisclosure } from "./executeDisclosure.model";
import { PostDisclosure } from "./postDisclosureAssessment.model";
import { FullDisclosureAttributes } from "otz-types";



export class FullDisclosure
  extends Model<FullDisclosureAttributes>
  implements FullDisclosureAttributes
{
  executeDisclosureID!: string;
  postDisclosureID!: string;

}

FullDisclosure.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    executeDisclosureID: {
      type: DataTypes.UUID,
      references: {
        model: "executeDisclosure",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    postDisclosureID: {
      type: DataTypes.UUID,
      references: {
        model: "postDisclosure",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
  },
  {
    sequelize: connect,
    tableName: "fullDisclosure",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

FullDisclosure.belongsTo(ExecuteDisclosure, { foreignKey: "executeDisclosureID" });
FullDisclosure.belongsTo(PostDisclosure, { foreignKey: "postDisclosureID" });

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
