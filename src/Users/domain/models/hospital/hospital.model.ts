/* eslint-disable camelcase */
import { DataTypes, Model } from 'sequelize'
import { connect } from '../../db/connect'
import { HospitalAttributes } from 'otz-types'


export class Hospital extends Model<HospitalAttributes> {}

Hospital.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      // defaultValue: UUIDV4,
      autoIncrement: true,
      unique: true
    },
    subCountyID: {
      type: DataTypes.STRING
    },
    mflCode: {
      type: DataTypes.INTEGER
    },
    hospitalName: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize: connect,
    tableName: 'hospitals'
  }
)

// (async () => {
//   await sequelize.sync();
//   console.log('Hospital Table synced successfully');
// })();
