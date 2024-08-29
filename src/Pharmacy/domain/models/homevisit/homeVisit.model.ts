import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { HomeVisitAttributes  } from 'otz-types'
import { connect } from '../../db/connect';
import { ART } from '../art/art.model';
import { Patient } from '../patients.models';
import { User } from '../user.model';
import { HomeVisitReason } from './homeVisitReason.model';
import { HomeVisitFrequency } from './homeVisitFrequency.model';
// import { type PatientEntity } from '../entities/PatientEntity'

export enum UserRoles {
  Admin = "admin",
  Clinician = "clinician",
  MentorMother = "mentor mother",
  AYPAdvocate = "ayp advocate",
  Nurse = "nurse",
  patient = "patient",
}

export class HomeVisit extends Model<HomeVisitAttributes> implements HomeVisitAttributes {
id?: string | undefined;
patientID?: string | undefined;
homeVisitFrequencyID?: string | undefined;
homeVisitReasonID?: string | undefined;
userID?: string | undefined;
dateRequested?: string | undefined;
artPrescription?: string | undefined;
tbPrescription?: string | undefined;
noOfPills?: number | undefined;
medicineStatus?: string | undefined;
actionTaken?: string | undefined;
returnToClinic?: string | undefined;
isPillsCounted?: boolean | undefined;
isClinicVisits?: boolean | undefined;
isDisclosure?: boolean | undefined;
isGuardianSupport?: boolean | undefined;
isSupportGroupAttendance?: boolean | undefined;
isHouseholdTested?: boolean | undefined;

}

HomeVisit.init(
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
    homeVisitReasonID: {
      type: DataTypes.UUID,
      references: {
        model: "homeVisitReasons",
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
    dateRequested: {
      type: DataTypes.DATE,
    },
    homeVisitFrequencyID: {
      type: DataTypes.UUID,
      references: {
        model: "homeVisitFrequencies",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    artPrescription: {
      type: DataTypes.JSONB,
      // references: {
      //   model: 'artPrescription',
      //   key: 'id',
      // },
      // onDelete: 'CASCADE',
    },
    tbPrescription: {
      type: DataTypes.JSONB,
    },

    noOfPills: {
      type: DataTypes.INTEGER,
    },
    medicineStatus: {
      type: DataTypes.STRING,
    },
    actionTaken: {
      type: DataTypes.STRING,
    },
    returnToClinic: {
      type: DataTypes.DATE,
    },
    isPillsCounted: {
      type: DataTypes.BOOLEAN,
    },
    isClinicVisits: {
      type: DataTypes.BOOLEAN,
    },
    isDisclosure: {
      type: DataTypes.BOOLEAN,
    },
    isGuardianSupport: {
      type: DataTypes.BOOLEAN,
    },
    isSupportGroupAttendance: {
      type: DataTypes.BOOLEAN,
    },
    isHouseholdTested: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize: connect,
    tableName: "homeVisits",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

HomeVisit.belongsTo(ART, { foreignKey: "artPrescriptionID" });
HomeVisit.belongsTo(Patient, { foreignKey: "patientID" });
HomeVisit.belongsTo(User, { foreignKey: "userID" });
HomeVisit.belongsTo(HomeVisitReason, { foreignKey: "homeVisitReasonID" });
HomeVisit.belongsTo(HomeVisitFrequency, { foreignKey: "homeVisitFrequencyID" });

// Patient.belongsTo(Hospital, { foreignKey: 'hospitalID' })

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
