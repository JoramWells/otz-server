/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";
import { connect } from "../../db/connect";
import { Patient } from "../patients.models";
import { PatientVisits } from "../patientVisits.model";
import { ARTPrescription } from "./artPrescription.model";
import { PrescriptionInterface } from "otz-types";
import { adherenceMonitor2 } from "../../../utils/adherence2";

export class Prescription extends Model<PrescriptionInterface> {
  id: string | undefined;
  patientID!: string;
  patientVisitID!: string;
  artPrescriptionID!: string;
  noOfPills!: number;
  frequency!: number;
  refillDate!: Date;
  nextRefillDate!: Date;
  expectedNoOfPills!: number;
  computedNoOfPills!: number;
  updatedAtExpectedNoOfPills!: Date;
  createdAt!: Date;
  updatedAt!: Date;
}

Prescription.init(
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
      allowNull: false,
      onDelete: "CASCADE",
    },
    patientVisitID: {
      type: DataTypes.UUID,
      references: {
        model: "patientVisits",
        key: "id",
      },
      allowNull: false,
      unique: true,
      onDelete: "CASCADE",
    },
    artPrescriptionID: {
      type: DataTypes.UUID,
      references: {
        model: "artPrescriptions",
        key: "id",
      },
      allowNull: false,
      onDelete: "CASCADE",
    },
    noOfPills: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
    },
    frequency: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    refillDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nextRefillDate: {
      type: DataTypes.DATE,
    },
    expectedNoOfPills: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    computedNoOfPills: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    updatedAtExpectedNoOfPills: {
      type: DataTypes.DATE,
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

    tableName: "prescriptions",
  }
);

// const disableForeignKeyChecksQuery = 'SET FOREIGN_KEY_CHECKS = 0;'
// void connect.query(disableForeignKeyChecksQuery)

Prescription.belongsTo(Patient, {
  foreignKey: "patientID",
  constraints: false,
});
Prescription.belongsTo(PatientVisits, {
  foreignKey: "patientVisitID",
  constraints: false,
});
Prescription.belongsTo(ARTPrescription, {
  foreignKey: "artPrescriptionID",
  constraints: false,
});

// Prescription.afterCreate(async () => {
//   await adherenceMonitor2();
// });

// void connect
//   .sync({alter: true })
//   .then(async () => {
//     console.log('Prescription table created successfully!!')
//   })

// export { Caregiver }
