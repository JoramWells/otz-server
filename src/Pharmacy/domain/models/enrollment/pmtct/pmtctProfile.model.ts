/* eslint-disable camelcase */
import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { connect } from '../../../db/connect'
import { Patient } from '../../patients.models'


export interface PMTCTProfileAttributes {
  id?: string
  patientID: string
  kmhflCode: string
  anc: string
  pncNo: string
}

export class PMTCTProfile extends Model<PMTCTProfileAttributes> implements PMTCTProfileAttributes {
  id?: string | undefined
  patientID!: string
  kmhflCode!: string
  anc!: string
  pncNo!: string
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
