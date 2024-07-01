import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { Courses } from "./courses.model";
import { Chapter } from "./chapters.model";
import { ChapterProgressAttributes } from "otz-types";
// import { type PatientEntity } from '../entities/PatientEntity'



export class ChapterProgress
  extends Model<ChapterProgressAttributes>
  implements ChapterProgressAttributes
{
  id!: string;
  courseID!: string;
  chapterID!: string;
  startDate!: string;
  endDate!: string;
  isComplete!: boolean;
}

ChapterProgress.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    courseID: {
      type: DataTypes.UUID,
      references: {
        model: "courses",
        key: "id",
      },
      onDelete: "CASCADE",
    },

    chapterID: {
      type: DataTypes.UUID,
      references: {
        model: "chapters",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    startDate: {
      type: DataTypes.DATE,
    },
    endDate: {
      type: DataTypes.DATE,
    },
    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  },
  {
    sequelize: connect,
    tableName: "chapterProgress",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

ChapterProgress.belongsTo(Courses,{foreignKey:'courseID'})
ChapterProgress.belongsTo(Chapter, { foreignKey: "chapterID" });

// (async () => {
// void connect.sync()
// console.log('Patient Table synced successfully')
// })()
