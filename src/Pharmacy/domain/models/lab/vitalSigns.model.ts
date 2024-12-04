import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";

import { VitalSignsInterface } from "otz-types";
import { connect } from "../../db/connect";
import { Patient } from "../patients.models";
import { PatientVisits } from "../patientVisits.model";

// import { type PatientEntity } from '../entities/PatientEntity'


export class VitalSigns
  extends Model<VitalSignsInterface>
  implements VitalSignsInterface
{
id?: string | undefined;
patientID?: string | undefined;
patientVisitID?: string | undefined;
bmi?: string | undefined;
temperature?: string | undefined;
weight?: string | undefined;
height?: string | undefined;
systolic?: string | undefined;
diastolic?: string | undefined;
muac?: string | undefined;
  nutritionalStatus!: string;
  oxygenSAturation!: string;
pulseRate?: string | undefined;
lmp?: string | undefined;
gravida?: string | undefined;
parity?: string | undefined;
}

VitalSigns.init(
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
    patientVisitID: {
      type: DataTypes.UUID,
      references: {
        model: "patientVisits",
        key: "id",
      },
      onDelete: "CASCADE",
      unique: true,
      allowNull: false,
    },
    bmi: {
      type: DataTypes.STRING,
    },
    temperature: {
      type: DataTypes.FLOAT,
    },
    weight: {
      type: DataTypes.FLOAT,
    },
    height: {
      type: DataTypes.FLOAT,
    },
    systolic: {
      type: DataTypes.FLOAT,
    },
    diastolic: {
      type: DataTypes.FLOAT,
    },

    muac: {
      type: DataTypes.STRING,
    },
    nutritionalStatus: {
      type: DataTypes.STRING,
    },
    oxygenSAturation: {
      type: DataTypes.STRING,
    },
    pulseRate: {
      type: DataTypes.STRING,
    },
    respiratoryRate: {
      type: DataTypes.STRING,
    },
    lmp: {
      type: DataTypes.DATE,
    },
    gravida: {
      type: DataTypes.STRING,
    },
    parity: {
      type: DataTypes.STRING,
    },
    edd: {
      type: DataTypes.DATE,
    },
  },

  {
    sequelize: connect,
    tableName: "vitalSigns",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);


VitalSigns.belongsTo(PatientVisits, { foreignKey: "patientVisitID" });
VitalSigns.belongsTo(Patient, { foreignKey: "patientID" });

// const syncDB = async () => {
//   try {
//     // await disableForeignKeyChecks(connect)
//     return await connect.sync({ alter: { exclude: ['createdAt', 'updatedAt'] } })
//   } catch (error) {
//     console.log(error)
//   }
// }

// void syncDB()
// void connect.sync().then(async () => {
//   console.log("Patient table created successfully!!");
// });