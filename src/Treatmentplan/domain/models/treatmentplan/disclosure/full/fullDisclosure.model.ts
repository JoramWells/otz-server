import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../../../db/connect";
import { ExecuteDisclosure } from "./executeDisclosure.model";
import { PostDisclosure } from "./postDisclosureAssessment.model";
import { FullDisclosureAttributes } from "otz-types";
import { Patient } from "../../../patients.models";



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
    patientID: {
      type: DataTypes.UUID,
      references: {
        model: "patients",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    executeDisclosureID: {
      type: DataTypes.UUID,
      references: {
        model: "executeDisclosure",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: true,
    },
    postDisclosureID: {
      type: DataTypes.UUID,
      references: {
        model: "postDisclosure",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: true,
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
FullDisclosure.belongsTo(Patient, {
  foreignKey: "patientID",
});
// (async () => {
connect.sync()
// console.log('Patient Table synced successfully')
// })()
