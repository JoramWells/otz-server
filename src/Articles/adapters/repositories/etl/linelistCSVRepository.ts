import { RedisAdapter } from "../redisAdapter";
import { ILineListRepository } from "../../../application/interfaces/etl/ILineListRepository";
import { LineListCSVInterface } from "otz-types";
import { LineListCSV } from "../../../domain/models/etl/linelistCSV.model";
import { User } from "../../../domain/models/user.model";
import { Op } from "sequelize";
import { LineListResponseInterface } from "../../../entities/LineListResponseInterface";

export class LineListCSVRepository implements ILineListRepository {
  // findAllBooksById: (id: string) => Promise<LineListCSVInterface[] | null>;
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(data: LineListCSVInterface): Promise<LineListCSVInterface> {
    await this.redisClient.connect();
    const results: LineListCSVInterface = await LineListCSV.create(data);
    // await this.redisClient.del(coursesCache);
    await this.redisClient.disconnect();

    return results;
  }

  async find(
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ): Promise<LineListResponseInterface | null | undefined> {
    try {
      await this.redisClient.connect();
      // check if patient

      let where = {};

      if (searchQuery) {
        where = {
          ...where,
          [Op.or]: [
            { firstName: { [Op.iLike]: `%${searchQuery}%` } },
            { middleName: { [Op.iLike]: `%${searchQuery}%` } },
            { cccNo: { [Op.iLike]: `%${searchQuery}%` } },
            { lastName: { [Op.iLike]: `%${searchQuery}%` } },
          ],
        };
      }

      console.log(where, 'were!!')

      const offset = (page - 1) * pageSize;
      const limit = pageSize;

      const { rows, count } = await LineListCSV.findAndCountAll({
        where,
        limit,
        offset,
        include: [
          {
            model: User,
            attributes:[],
            where: {
              hospitalID,
            },
          },
        ],
      });
      // if ((await this.redisClient.get(coursesCache)) === null) {
      //   const results = await Chapter.findAll({
      //     include:[
      //       {
      //         model: ArticleCategory,
      //         attributes:['id','description']
      //       }
      //     ]
      //   });
      //   // logger.info({ message: "Fetched from db!" });
      //   // console.log("fetched from db!");
      //   // set to cace
      //   await this.redisClient.set(coursesCache, JSON.stringify(results));

      //   return results;
      // }
      // const cachedPatients: string | null = await this.redisClient.get(
      //   coursesCache
      // );
      // if (cachedPatients === null) {
      //   return [];
      // }
      // await this.redisClient.disconnect();
      // // logger.info({ message: "Fetched from cache!" });
      // console.log("fetched from cache!");

      // const results: LineListCSVInterface[] = JSON.parse(cachedPatients);

      return {
        data: rows,
        total: count,
        page: page,
        pageSize: limit,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id: string): Promise<LineListCSVInterface | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results: LineListCSVInterface | null = await LineListCSV.findOne({
      where: {
        id,
      },
    });
    // console.log(results, 'results')

    // const patientResults: AppointmentEntity = {
    //   firstName: results?.firstName,
    //   middleName: results?.middleName,
    //   sex: results?.sex,
    //   phoneNo: results?.phoneNo,
    //   idNo: results?.idNo,
    //   occupationID: results?.occupationID,
    // };
    //   await this.redisClient.set(id, JSON.stringify(results));

    //   return results;
    // }

    // const cachedData: string | null = await this.redisClient.get(id);
    // if (cachedData === null) {
    //   return null;
    // }
    // const results: LineListCSVInterface = JSON.parse(cachedData);
    // console.log("fetched from cache!");

    return results;
  }

  //
  async delete(id: string): Promise<number | null> {
    const results = LineListCSV.destroy({
      where: {
        id,
      },
    });
    return results;
  }
}
