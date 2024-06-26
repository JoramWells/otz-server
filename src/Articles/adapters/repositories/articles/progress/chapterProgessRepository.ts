import { IChapterProgressRepository } from "../../../../application/interfaces/articles/progress/IChapterProgressRepository";
import { ChapterProgressEntity } from "../../../../domain/entities/articles/ChapterProgessEntity";
import { ChapterProgress, ChapterProgressAttributes } from "../../../../domain/models/articles/chapterProgress.model";
import { RedisAdapter } from "../../redisAdapter";



export class ChapterProgressRepository implements IChapterProgressRepository {
  // findAllBooksById: (id: string) => Promise<ChapterProgressEntity[] | null>;
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(data: ChapterProgressEntity): Promise<ChapterProgressEntity> {
    await this.redisClient.connect();
    const results: ChapterProgressAttributes = await ChapterProgress.create(
      data
    );
    // await this.redisClient.del(chapterCache);
    await this.redisClient.disconnect();

    return results;
  }

  async find(): Promise<ChapterProgressEntity[]> {
    await this.redisClient.connect();
    // check if patient
    const results = await ChapterProgress.findAll({});
    // if ((await this.redisClient.get(chapterCache)) === null) {
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
    //   await this.redisClient.set(chapterCache, JSON.stringify(results));

    //   return results;
    // }
    // const cachedPatients: string | null = await this.redisClient.get(
    //   chapterCache
    // );
    // if (cachedPatients === null) {
    //   return [];
    // }
    // await this.redisClient.disconnect();
    // // logger.info({ message: "Fetched from cache!" });
    // console.log("fetched from cache!");

    // const results: ChapterProgressEntity[] = JSON.parse(cachedPatients);
    console.log(results, "rt");

    return results;
  }

  async findById(id: string): Promise<ChapterProgressEntity | null> {
    await this.redisClient.connect();
    if ((await this.redisClient.get(id)) === null) {
      const results: ChapterProgressAttributes | null =
        await ChapterProgress.findOne({
          where: {
            id,
          },
        });

      // const patientResults: AppointmentEntity = {
      //   firstName: results?.firstName,
      //   middleName: results?.middleName,
      //   sex: results?.sex,
      //   phoneNo: results?.phoneNo,
      //   idNo: results?.idNo,
      //   occupationID: results?.occupationID,
      // };
      await this.redisClient.set(id, JSON.stringify(results));

      return results;
    }

    const cachedData: string | null = await this.redisClient.get(id);
    if (cachedData === null) {
      return null;
    }
    const results: ChapterProgressAttributes = JSON.parse(cachedData);
    console.log("fetched from cache!");

    return results;
  }

  //
  async findAllBooksById(id: string): Promise<ChapterProgressEntity[] | null> {
    const results: ChapterProgressAttributes[] | null =
      await ChapterProgress.findAll({});

    return results;
  }

  async delete(id: string): Promise<number | null> {
    const results = ChapterProgress.destroy({
      where: {
        id,
      },
    });
    return results;
  }
}
