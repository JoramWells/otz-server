/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { DataTypes, Model } from 'sequelize'
import { connect } from '../../../db/connect'
import { SchoolAttributes } from 'otz-types'

export class School extends Model<SchoolAttributes> {}

School.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
      // defaultValue: UUIDV4,
    },
    schoolName: {
      type: DataTypes.STRING
    },
    countyName: {
      type: DataTypes.STRING
    },

    subCountyName: {
      type: DataTypes.STRING
    },
    constituency: {
      type: DataTypes.STRING
    },
    division: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    subLocation: {
      type: DataTypes.STRING
    },
    level: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    },
    sponsor: {
      type: DataTypes.STRING
    },

    longitude: {
      type: DataTypes.STRING
    },
    latitude: {
      type: DataTypes.STRING
    },
    classrooms: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize: connect,
    tableName: 'schools',
    timestamps: false
  }
)

// (async () => {
//   await sequelize.sync();
//   console.log('LOCATION Table synced successfully');
// })();
