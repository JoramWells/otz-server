import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../../db/connect";
import { ChildDisclosureEligibility } from "./childDisclosureEligibility.model";
import { ChildCaregiverReadiness } from "./childCaregiverReadiness.model";
import { PartialDisclosureAttributes } from "otz-types";



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
    childDisclosureEligibilityID: {
      type: DataTypes.UUID,
      references: {
        model: "childDisclosureEligibility",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    childCaregiverReadinessID: {
      type: DataTypes.UUID,
      references: {
        model: "childCaregiverReadiness",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
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

PartialDisclosure.belongsTo(ChildDisclosureEligibility, { foreignKey: "childDisclosureEligibilityID" });
PartialDisclosure.belongsTo(ChildCaregiverReadiness, { foreignKey: "childCaregiverReadinessID" });

// (async () => {
// connect.sync()
// console.log('Partial Disclosure Table synced successfully')
// })()
