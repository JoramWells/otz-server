import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../../db/connect";
import { Patient } from "../../patients.models";
import { PatientVisits } from "../../patientVisits.model";
// import { type PatientEntity } from '../entities/PatientEntity'

 enum DifficultyRemembering {
   Never = "never",
   Once = "once in a while",
   Sometimes = "sometimes",
   Usually = "usually",
   AllTime = "all the time",
 }

export interface ChildDisclosureEligibilityAttributes {
  id?: string;
  patientID: string;
  patientVisitID: string;
  isCorrectAge: boolean;
  isKnowledgeable: boolean;
  isWillingToDisclose: boolean;
  taskOneComments: string;
}

export class ChildDisclosureEligibility extends Model<ChildDisclosureEligibilityAttributes> implements ChildDisclosureEligibilityAttributes {
  isChildActivityAssessed!: boolean;
  isSupportedCaregiverChildToDisclose!: boolean;
  isSecuredPatientInfo!: boolean;
  disclosureDate!: Date;
  isCorrectAge!: boolean;
  isWillingToDisclose!: boolean;
  isKnowledgeable!: boolean;
  taskOneComments!: string;
  id: string | undefined;
  patientID!: string;
  patientVisitID!: string;

}

ChildDisclosureEligibility.init(
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
    },
    patientVisitID: {
      type: DataTypes.UUID,
      references: {
        model: "patientVisits",
        key: "id",
      },
    },
    isCorrectAge: {
      type: DataTypes.BOOLEAN,
    },
    isWillingToDisclose: {
      type: DataTypes.BOOLEAN,
    },
    isKnowledgeable: {
      type: DataTypes.BOOLEAN,
    },
    taskOneComments: {
      type: DataTypes.STRING,
    },

  },
  {
    sequelize: connect,
    tableName: "childDisclosureEligibility",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

ChildDisclosureEligibility.belongsTo(Patient, { foreignKey: "patientID" });
ChildDisclosureEligibility.belongsTo(PatientVisits, { foreignKey: "patientVisitID" });

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
