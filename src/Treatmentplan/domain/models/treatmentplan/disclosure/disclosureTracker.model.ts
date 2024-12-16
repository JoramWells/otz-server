import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../../db/connect";
import { DisclosureTrackerInterface } from "otz-types";
import { Patient } from "../../patients.models";
import { PartialDisclosure } from "./partialDisclosure.model";
import { FullDisclosure } from "./full/fullDisclosure.model";



export class DisclosureTracker
  extends Model<DisclosureTrackerInterface>
  implements DisclosureTrackerInterface
{
  id?: string;
  patientID?: string;
  hasFullDisclosure?: boolean;
  hasPartialDisclosure?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

DisclosureTracker.init(
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
      //   primaryKey: true
    },
    partialDisclosureID: {
      type: DataTypes.UUID,
      references: {
        model: "partialDisclosure",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: true,
      //   primaryKey: true
    },
    fullDisclosureID: {
      type: DataTypes.UUID,
      references: {
        model: "fullDisclosure",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: true,
      //   primaryKey: true
    },
    // hasPartialDisclosure: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: false,
    // },
    // hasFullDisclosure: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    //   defaultValue: false,
    // },
  },
  {
    sequelize: connect,
    tableName: "disclosureTracker",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["patientID"],
      },
    ],
  }
);


DisclosureTracker.belongsTo(Patient, {
  foreignKey: "patientID",
});

DisclosureTracker.belongsTo(PartialDisclosure, {
  foreignKey: "partialDisclosureID",
});

DisclosureTracker.belongsTo(FullDisclosure, {
  foreignKey: "fullDisclosureID",
});


// (async () => {
// connect.sync()
// console.log('Partial Disclosure Table synced successfully')
// })()
