import { DataTypes, Model, Sequelize, UUIDV4 } from 'sequelize'
import { createClient } from 'redis'
import { connect } from '../../db/connect'

// import { type PatientEntity } from '../entities/PatientEntity'

export interface AppointmentAttributes {
  id?: string
  userID?: string
  patientID: string
  patientVisitID: string
  appointmentAgendaID?: string
  appointmentStatusID?: string
  appointmentDate?: Date
  appointmentTime?: string
}

export class Appointment
  extends Model<AppointmentAttributes>
  implements AppointmentAttributes {
  id: string | undefined
  userID?: string | undefined
  patientID!: string
  patientVisitID!: string
  appointmentAgendaID?: string | undefined
  appointmentStatusID?: string | undefined
  appointmentDate?: Date | undefined
  appointmentTime?: string | undefined
}

Appointment.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    userID: {
      type: DataTypes.UUID,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    patientID: {
      type: DataTypes.UUID,
      references: {
        model: 'patients',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    appointmentAgendaID: {
      type: DataTypes.UUID,
      references: {
        model: 'appointmentAgendas',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    patientVisitID: {
      type: DataTypes.UUID,
      references: {
        model: 'patientVisits',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    appointmentStatusID: {
      type: DataTypes.UUID,
      references: {
        model: 'appointmentStatus',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    appointmentDate: {
      type: DataTypes.DATEONLY
    },

    appointmentTime: {
      type: DataTypes.TIME,
      defaultValue: Sequelize.literal('CURRENT_TIME')
      //   timezone: false,
    }
  },
  {
    sequelize: connect,
    tableName: 'appointments',
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true
  }
)

Appointment.afterCreate(async (appointments, options) => {
  const redisClient = createClient({ url: 'redis://redis:6379' })
  await redisClient.connect()
  await redisClient.del('appointmentData')
  console.log(appointments, 'io')
})

Appointment.afterUpdate(async () => {
  const redisClient = createClient({ url: 'redis://redis:6379' })
  await redisClient.connect()
  await redisClient.del('appointmentData')
})

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()