/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { connect } from '../../../db/connect'
import { Patient } from '../../patients.models'
import { PMTCTProfileInterface } from "otz-types";


export class PMTCTProfile
  extends Model<PMTCTProfileInterface>
  implements PMTCTProfileInterface
{
  id?: string | undefined;
  patientID!: string;
  kmhflCode!: string;
  anc!: string;
  pncNo!: string;
}

PMTCTProfile.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      // autoIncrement: true,
      defaultValue: UUIDV4
    },
    patientID: {
      type: DataTypes.UUID,
      references: {
        model: 'patients',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    kmhflCode: {
      type: DataTypes.INTEGER
    },
    anc: {
      type: DataTypes.STRING
    },
    pncNo: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize: connect,
    tableName: 'pmtctProfile'
  }
)

PMTCTProfile.belongsTo(Patient, { foreignKey: 'patientID' })

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })();
