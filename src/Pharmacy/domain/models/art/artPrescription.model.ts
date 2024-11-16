import { Model, UUIDV4, DataTypes } from 'sequelize'
import { connect } from '../../db/connect'
import { Patient } from '../patients.models'
import { ARTPrescriptionInterface } from 'otz-types'
import { PatientVisits } from '../patientVisits.model';

export class ARTPrescription extends Model<ARTPrescriptionInterface> {
  id!: string;
  patientID!: string;
  regimen!: string;
  changeReason!: string;
  stopReason!: string;
  startDate!: Date;
  stopDate!: Date;
  changeDate!: Date;
  isStandard!: boolean;
  isStopped!: boolean;
  isSwitched!: boolean;
  line!: string;
}

ARTPrescription.init(
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
    artPrescriptionID: {
      type: DataTypes.UUID,
      references: {
        model: "artPrescriptions",
        key: "id",
      },
      allowNull: false,
      onDelete: "CASCADE",
    },
    regimen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
    },
    isStandard: {
      type: DataTypes.BOOLEAN,
    },
    isStopped: {
      type: DataTypes.BOOLEAN,
    },
    isSwitched: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    line: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    changeReason: {
      type: DataTypes.STRING,
    },
    stopReason: {
      type: DataTypes.STRING,
    },
    changeDate: {
      type: DataTypes.DATE,
    },
    stopDate: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: connect,
    tableName: "artPrescriptions",
  }
);

ARTPrescription.belongsTo(Patient, { foreignKey: 'patientID' })
ARTPrescription.belongsTo(PatientVisits, {
  foreignKey: "patientVisitID",
  constraints: false,
});

// (async () => {
connect.sync()
// console.log('ART Categorygt Table synced Successfully')
// })();
