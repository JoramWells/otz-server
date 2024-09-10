import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { connect } from '../../db/connect';
import { HomeVisitConfigAttributes } from 'otz-types';
import { HomeVisitReason } from './homeVisitReason.model';
import { Patient } from '../patients.models';

export enum FrequencyAttributes {
  Bimonthly = "Bimonthly",
  Daily = "Daily",
  Monthly = "Monthly",
  Once = "Once",
  Weekly = "Weekly",
}

export class HomeVisitConfig extends Model<HomeVisitConfigAttributes> implements HomeVisitConfigAttributes {
id?: string | undefined;
patientID?: string | undefined;
frequency?: FrequencyAttributes
homeVisitReasonID?: string | undefined;
userID?: string | undefined;
dateRequested?: string | undefined;
}

HomeVisitConfig.init(
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
    patient: {
      type: DataTypes.JSONB,
      // onDelete: 'CASCADE',
      allowNull: false,
    },
    user: {
      type: DataTypes.JSONB,
      // onDelete: 'CASCADE',
      allowNull: false,
    },
    homeVisitReasonID: {
      type: DataTypes.UUID,
      references: {
        model: "homeVisitReasons",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    userID: {
      type: DataTypes.UUID,
      references: {
        model: "patients",
        key: "id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    dateRequested: {
      type: DataTypes.DATE,
    },
    frequency: {
      type: DataTypes.ENUM(...Object.values(FrequencyAttributes)),
      defaultValue: FrequencyAttributes.Once,
      allowNull: false,
    },
  },
  {
    sequelize: connect,
    tableName: "homeVisitConfig",
    postgresql: {
      fillFactor: 70
    },
    timestamps: true,
  }
);

// HomeVisitConfig.ass

HomeVisitConfig.belongsTo(HomeVisitReason, { foreignKey: "homeVisitReasonID" });
HomeVisitConfig.belongsTo(Patient, { foreignKey: "patientID" });
HomeVisitConfig.belongsTo(Patient, { foreignKey: "userID" });

// Patient.belongsTo(Hospital, { foreignKey: 'hospitalID' })

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
