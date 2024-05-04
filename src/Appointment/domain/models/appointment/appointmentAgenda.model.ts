import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
// import { type PatientEntity } from '../entities/PatientEntity'

export interface AppointmentAgendaAttributes {
  id?: string;
  agendaDescription?: string;
}

export class AppointmentAgenda
  extends Model<AppointmentAgendaAttributes>
  implements AppointmentAgendaAttributes
{
  id?: string | undefined;
  agendaDescription?: string | undefined;

}

AppointmentAgenda.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    agendaDescription: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: connect,
    tableName: "appointmentAgendas",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);


// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
