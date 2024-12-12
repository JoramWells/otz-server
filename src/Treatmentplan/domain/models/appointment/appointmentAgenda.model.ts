import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
// import { type PatientEntity } from '../entities/PatientEntity'
import { AppointmentAgendaAttributes } from "otz-types";

export class AppointmentAgenda
  extends Model<AppointmentAgendaAttributes>
  implements AppointmentAgendaAttributes
{
  id!: string
  agendaDescription!: string;

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
      unique: true,
      allowNull: false
    },
  },
  {
    sequelize: connect,
    tableName: "appointmentAgendas",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
    indexes:[
      {
        fields:['id']
      },
      {
        fields:['agendaDescription']
      }
    ]
  }
);


// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
