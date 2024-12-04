import { DataTypes, Model, Sequelize, UUIDV4 } from "sequelize";
import { Hospital } from "./hospital/hospital.model";
import { connect } from "../db/connect";
import { CALHIVInterface  } from "otz-types";


export interface PatientResponseInterface {
  data: CALHIVInterface[];
  total: number;
  page: number;
  pageSize: number;
}

export class CALHIV
  extends Model<CALHIVInterface>
  implements CALHIVInterface
{
  id?: string | undefined;

  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

CALHIV.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    age_0_9: {
      type: DataTypes.STRING,
    },
    age_10_14: {
      type: DataTypes.STRING,
    },
    age_15_19: {
      type: DataTypes.STRING,
    },
    age_20_24: {
      type: DataTypes.STRING,
    },
    hospitalID: {
      type: DataTypes.UUID,
      references: {
        model: "hospitals",
        key: "id",
      },
      // allowNull: false,`
      onDelete: "CASCADE",
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },

  {
    sequelize: connect,
    tableName: "calHIV",
    // postgresql: {
    //   fillFactor: 70
    // },
    timestamps: true,
  }
);


CALHIV.belongsTo(Hospital, { foreignKey: "hospitalID" });

// const syncDB = async () => {
//   try {
//     // await disableForeignKeyChecks(connect)
//     return await connect.sync({ alter: { exclude: ['createdAt', 'updatedAt'] } })
//   } catch (error) {
//     console.log(error)
//   }
// }


connect.sync()

// void syncDB()
// void connect.sync().then(async () => {
//   console.log("Patient table created successfully!!");
// });
