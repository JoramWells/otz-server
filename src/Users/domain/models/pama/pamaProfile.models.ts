/* eslint-disable camelcase */
import { DataTypes, Model } from 'sequelize'
import { connect } from '../../db/connect'

export interface PAMAInterface {
  id?: string
  childID: string
  primaryCaregiverID: string
  dateOfEnrollment: Date
  isPaired: boolean
  noOfCaregivers: number
}

export class PAMAProfile extends Model<PAMAInterface> {
  childID!: string
  primaryCaregiverID!: string
  dateOfEnrollment!: Date
  isPaired!: boolean
  noOfCaregivers!: number
}

PAMAProfile.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true
    // autoIncrement: true,
    // defaultValue: UUIDV4,
  },
  childID: {
    type: DataTypes.STRING
  },
  primaryCaregiverID: {
    type: DataTypes.STRING
  },
  dateOfEnrollment: {
    type: DataTypes.STRING
  },

  isPaired: {
    type: DataTypes.BOOLEAN
  },
  noOfCaregivers: {
    type: DataTypes.STRING
  }
},
{
  sequelize: connect,
  tableName: 'pamaProfile'
})

// (async () => {
//   await sequelize.sync();
//   console.log('Patient Table synced successfully');
// })();
