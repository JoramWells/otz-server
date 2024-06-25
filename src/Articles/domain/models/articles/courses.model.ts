import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { Books } from "./books.model";
import { Patient } from "../patients/patients.models";
// import { type PatientEntity } from '../entities/PatientEntity'

export interface CoursesAttributes {
  id: string;
  patientID: string;
  bookID: string;
}

export class Courses
  extends Model<CoursesAttributes>
  implements CoursesAttributes
{
  id!: string;
  patientID!: string;
  bookID!: string;
}

Courses.init(
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
    },

    bookID: {
      type: DataTypes.UUID,
      references: {
        model: "books",
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize: connect,
    tableName: "courses",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

Courses.belongsTo(Books,{foreignKey:'bookID'})
Courses.belongsTo(Patient, { foreignKey: "patientID" });

// (async () => {
// void connect.sync({alter:true})
// console.log('Patient Table synced successfully')
// })()
