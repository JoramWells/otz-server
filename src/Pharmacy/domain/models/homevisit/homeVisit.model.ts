import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { HomeVisitAttributes  } from 'otz-types'
import { connect } from '../../db/connect';
import { HomeVisitConfig } from './homeVisitConfig.model';



export enum MedicineStatusAttributes{
  Adequate = 'Adequate',
  Inadequate = 'Inadequate'
}
export class HomeVisit
  extends Model<HomeVisitAttributes>
  implements HomeVisitAttributes
{
  id?: string | undefined;
  homeVisitConfigID?: string | undefined;
  artPrescription?: {
    currentRegimen: string;
    currentRegimenBegan: Date | string;
  };
  tbPrescription?: string | undefined;
  noOfPills?: number | undefined;
  medicineStatus?: MedicineStatusAttributes;
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
    homeVisitConfigID: {
      type: DataTypes.UUID,
      references: {
        model: "homeVisitConfig",
        key: "id",
      },
      onDelete: 'CASCADE',
      allowNull: false
    },
    artPrescription: {
      type: DataTypes.JSONB,
     },
    tbPrescription: {
      type: DataTypes.JSONB,
    },

    noOfPills: {
      type: DataTypes.INTEGER,
    },
    medicineStatus: {
      type: DataTypes.ENUM(...Object.values(MedicineStatusAttributes)),
      defaultValue: MedicineStatusAttributes.Adequate,
      allowNull: false
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


HomeVisit.belongsTo(HomeVisitConfig, { foreignKey: "homeVisitConfigID" });


// Patient.belongsTo(Hospital, { foreignKey: 'hospitalID' })

// (async () => {
connect.sync()
// console.log('Patient Table synced successfully')
// })()
