import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";
import { createClient } from "redis";
import {AppointmentAgenda} from "./appointmentAgenda.model";
import {AppointmentStatus} from "./appointmentStatus.model";
import { Patient } from "../patients.models";
import { User } from "../user.model";
import { connect } from "../../../db/connect";
// import { type PatientEntity } from '../entities/PatientEntity'

export interface AppointmentAttributes {
  id: string;
  userID?: string;
  patientID: string;
  appointmentAgendaID?: string;
  appointmentStatusID?: string;
  appointmentDate?: string;
  appointmentTime?: string;
}

export class Appointment
  extends Model<AppointmentAttributes>
  implements AppointmentAttributes
{
  id!: string;
  userID?: string | undefined;
  patientID!: string;
  appointmentAgendaID?: string | undefined;
  appointmentStatusID?: string | undefined;
  appointmentDate?: string | undefined;
  appointmentTime?: string | undefined;
}

Appointment.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    userID: {
      type: DataTypes.UUID,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    patientID: {
      type: DataTypes.UUID,
      references: {
        model: "patients",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    appointmentAgendaID: {
      type: DataTypes.UUID,
      references: {
        model: "appointmentAgendas",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    appointmentStatusID: {
      type: DataTypes.UUID,
      references: {
        model: "appointmentStatus",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    appointmentDate: {
      type: DataTypes.DATEONLY,
    },

    appointmentTime: {
      type: DataTypes.TIME,
      defaultValue: Sequelize.literal("CURRENT_TIME"),
    //   timezone: false,
    },
  },
  {
    sequelize: connect,
    tableName: "appointments",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

Appointment.belongsTo(User, { foreignKey: 'userID', targetKey: 'id' });
Appointment.belongsTo(AppointmentAgenda, { foreignKey: 'appointmentAgendaID', targetKey: 'id' });
Appointment.belongsTo(
  AppointmentStatus,
  { foreignKey: 'appointmentStatusID', targetKey: 'id' },
);
Appointment.belongsTo(Patient, { foreignKey: 'patientID', targetKey: 'id' });

Appointment.afterCreate(async (appointments, options) => {
  const redisClient = createClient({ url: 'redis://redis:6379' });
  await redisClient.connect();
  await redisClient.del('appointmentData');
  console.log(appointments, 'io')
});

Appointment.afterUpdate(async () => {
  const redisClient = createClient({ url: 'redis://redis:6379' });
  await redisClient.connect();
  await redisClient.del('appointmentData');
});


// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
