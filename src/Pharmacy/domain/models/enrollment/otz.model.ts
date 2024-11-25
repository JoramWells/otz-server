/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4 } from "sequelize";
import { connect } from "../../db/connect";
import { Patient } from "../patients.models";
import { User } from "../user.model";
import { ARTPrescription } from "../art/artPrescription.model";
import { OTZEnrollmentsInterface } from "otz-types";
import { ViralLoad } from "../lab/viralLoad.model";


export interface OTZResponseInterface {
  data: OTZEnrollmentsInterface[];
  total: number;
  page: number;
  pageSize: number;
}
export class OTZ
  extends Model<OTZEnrollmentsInterface>
  implements OTZEnrollmentsInterface
{
  id!: string;
  enrolledBy!: string;
  patientID!: string;
  dateOfEnrollmentToOTZ?: string | Date | undefined;
  currentArtPrescriptionID!: string;
  currentViralLoadID!: string;
}
OTZ.init(
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
    },
    enrolledBy: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    dateOfEnrollmentToOTZ: {
      type: DataTypes.DATE,
    },
    currentArtPrescriptionID: {
      type: DataTypes.UUID,
      references: {
        model: "artPrescriptions",
        key: "id",
      },
      // allowNull: false,`
      onDelete: "CASCADE",
    },
    currentViralLoadID: {
      type: DataTypes.UUID,
      references: {
        model: "viralLoads",
        key: "id",
      },
      // allowNull: false,`
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: connect,

    tableName: "otzEnrollments",
  }
);

OTZ.belongsTo(ARTPrescription, { foreignKey: "currentArtPrescriptionID" });
OTZ.belongsTo(User, { foreignKey: "enrolledBy" });
OTZ.belongsTo(Patient, { foreignKey: "patientID" });
OTZ.belongsTo(ViralLoad, { foreignKey: "currentViralLoadID" });

connect.sync()
// console.log('User Table synced successfully')

// export { Caregiver }
