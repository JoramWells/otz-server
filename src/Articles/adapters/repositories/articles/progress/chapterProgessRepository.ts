import { ChapterProgressAttributes } from "otz-types";
import { IChapterProgressRepository } from "../../../../application/interfaces/articles/progress/IChapterProgressRepository";
import { ChapterProgress  } from "../../../../domain/models/articles/chapterProgress.model";
import { Chapter } from "../../../../domain/models/articles/chapters.model";
import { Courses } from "../../../../domain/models/articles/courses.model";
import { RedisAdapter } from "../../redisAdapter";



export class ChapterProgressRepository implements IChapterProgressRepository {
  // findAllBooksById: (id: string) => Promise<ChapterProgressAttributes[] | null>;
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(data: ChapterProgressAttributes): Promise<ChapterProgressAttributes> {
    await this.redisClient.connect();
    const results: ChapterProgressAttributes = await ChapterProgress.create(
      data
    );
    // await this.redisClient.del(chapterCache);
    await this.redisClient.disconnect();

    return results;
  }

  async find(): Promise<ChapterProgressAttributes[]> {
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

    // const results: ChapterProgressAttributes[] = JSON.parse(cachedPatients);
    console.log(results, "rt");

    return results;
  }

  async findById(id: string): Promise<ChapterProgressAttributes | null> {
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
  async findChapterProgressById(id: string): Promise<ChapterProgressAttributes[] | null> {
    const results: ChapterProgressAttributes[] | null =
      await ChapterProgress.findAll({
        where: {
          courseID: id,
        },
        include: [
          {
            model: Chapter,
            attributes: ["id", "description", "thumbnail"],
          },
        ],
      });

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
