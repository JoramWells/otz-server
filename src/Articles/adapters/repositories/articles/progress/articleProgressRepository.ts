import { ArticleProgressAttributes } from "otz-types";
import { IArticleProgressRepository } from "../../../../application/interfaces/articles/progress/IArticleProgressRepository";
import { Article } from "../../../../domain/models/articles/article.model";
import { ArticleProgress  } from "../../../../domain/models/articles/articleProgress.model";
import { RedisAdapter } from "../../redisAdapter";


export class ArticleProgressRepository implements IArticleProgressRepository {
  // findAllBooksById: (id: string) => Promise<ArticleProgressAttributes[] | null>;
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(data: ArticleProgressAttributes): Promise<ArticleProgressAttributes> {
    await this.redisClient.connect();
    const results: ArticleProgressAttributes = await ArticleProgress.create(
      data
    );
    // await this.redisClient.del(coursesCache);
    await this.redisClient.disconnect();

    return results;
  }

  async find(): Promise<ArticleProgressAttributes[]> {
    await this.redisClient.connect();
    // check if patient
    const results = await ArticleProgress.findAll({});
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

    // const results: ArticleProgressAttributes[] = JSON.parse(cachedPatients);
    console.log(results, "rt");

    return results;
  }

  async findById(id: string): Promise<ArticleProgressAttributes | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results: ArticleProgressAttributes | null =
      await ArticleProgress.findOne({
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
    // const results: ArticleProgressAttributes = JSON.parse(cachedData);
    // console.log("fetched from cache!");

    return results;
  }

  //
  async findAllProgress(id: string): Promise<ArticleProgressAttributes[] | null> {
    const results: ArticleProgressAttributes[] | null =
      await ArticleProgress.findAll({
        where: {
          chapterProgressID: id,
        },
        include:[
          {
            model: Article,
          }
        ]
      });

    return results;
  }

  //
  async delete(id: string): Promise<number | null> {
    const results = ArticleProgress.destroy({
      where: {
        id,
      },
    });
    return results;
  }
}
