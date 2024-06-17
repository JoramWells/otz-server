import { DataTypes, Model,  UUIDV4 } from "sequelize";
import { connect } from "../../../db/connect";
import { Books } from "./books.model";
// import { type PatientEntity } from '../entities/PatientEntity'

export interface ChapterAttributes {
  id: string;
  description: string;
  bookID: string;
  thumbnail: string;
}

export class Chapter
  extends Model<ChapterAttributes>
  implements ChapterAttributes
{
  id!: string;
  description!: string;
  thumbnail!: string;
  bookID!: string;
}

Chapter.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    description: {
      type: DataTypes.STRING,
    },
    thumbnail: {
      type: DataTypes.STRING,
    },
    bookID: {
      type: DataTypes.UUID,
       references: {
        model: 'books',
        key: 'id'
      },
      onDelete: 'CASCADE'

  },
  },
  {
    sequelize: connect,
    tableName: "chapters",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);

Chapter.belongsTo(Books,{foreignKey:'bookID'})
Books.hasMany(Chapter, {foreignKey:'bookID'} )

// (async () => {
// connect.sync()
// console.log('Patient Table synced successfully')
// })()
