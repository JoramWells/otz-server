import { RedisAdapter } from "../../redisAdapter";
import { ILineListRepository } from "../../../../application/interfaces/articles/ILineListRepository";
import { LineListCSVInterface } from "otz-types";
import { LineListCSV } from "../../../../domain/models/articles/linelistCSV.model";


export class LineListCSVRepository implements ILineListRepository {
  // findAllBooksById: (id: string) => Promise<LineListCSVInterface[] | null>;
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(data: LineListCSVInterface): Promise<LineListCSVInterface> {
    await this.redisClient.connect();
    const results: LineListCSVInterface = await LineListCSV.create(
      data
    );
    // await this.redisClient.del(coursesCache);
    await this.redisClient.disconnect();

    return results;
  }

  async find(): Promise<LineListCSVInterface[]> {
    await this.redisClient.connect();
    // check if patient
    const results = await LineListCSV.findAll({});
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
    console.log(results, "rt");

    return results;
  }

  async findById(id: string): Promise<LineListCSVInterface | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results: LineListCSVInterface | null =
      await LineListCSV.findOne({
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
