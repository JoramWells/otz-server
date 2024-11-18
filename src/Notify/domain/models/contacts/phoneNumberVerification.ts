/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { Patient } from "../patients.models";
import { User } from "../user.model";
import { PhoneNumberVerificationInterface } from "otz-types";


export class PhoneNumberVerification extends Model<PhoneNumberVerificationInterface> {
  patientID: string | undefined;
  id: string | undefined;
}

PhoneNumberVerification.init(
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
    userID: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    phoneNo: {
      type: DataTypes.STRING,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  },
  {
    sequelize: connect,

    tableName: "patientVisits",
  }
);

PhoneNumberVerification.belongsTo(Patient, { foreignKey: "patientID" });
PhoneNumberVerification.belongsTo(User, { foreignKey: "userID" });

// connect.sync()
// console.log('User Table synced successfully')

// export { Caregiver }
