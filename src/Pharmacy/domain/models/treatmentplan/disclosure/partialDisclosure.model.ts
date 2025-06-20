import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { ChildDisclosureEligibility } from "./childDisclosureEligibility.model";
import { ChildCaregiverReadiness } from "./childCaregiverReadiness.model";
import { PartialDisclosureAttributes } from "otz-types";
import { Patient } from "../../patients.models";
import { connect } from "../../../db/connect";



export class PartialDisclosure
  extends Model<PartialDisclosureAttributes>
  implements PartialDisclosureAttributes
{
  childDisclosureEligibilityID: string | undefined;
  childCaregiverReadinessID: string | undefined;

}

PartialDisclosure.init(
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
    childDisclosureEligibilityID: {
      type: DataTypes.UUID,
      references: {
        model: "childDisclosureEligibility",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: true,
    },
    childCaregiverReadinessID: {
      type: DataTypes.UUID,
      references: {
        model: "childCaregiverReadiness",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: true,
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  },
  {
    sequelize: connect,
    tableName: "partialDisclosure",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

PartialDisclosure.belongsTo(ChildDisclosureEligibility, {
  foreignKey: "childDisclosureEligibilityID",
});
PartialDisclosure.belongsTo(Patient, {
  foreignKey: "patientID",
});
PartialDisclosure.belongsTo(ChildCaregiverReadiness, { foreignKey: "childCaregiverReadinessID" });

// (async () => {
// connect.sync()
// console.log('Partial Disclosure Table synced successfully')
// })()
