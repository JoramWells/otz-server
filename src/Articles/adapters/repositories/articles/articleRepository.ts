// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { IArticleRepository } from '../../../application/interfaces/articles/IArticleRepository'
import { articleCache } from '../../../constants/appointmentCache'
import { ArticlesEntity } from '../../../domain/entities/articles/ArticlesEntity'
import { Article, ArticleAttributes } from '../../../domain/models/articles/article.model'
import { RedisAdapter } from '../redisAdapter'


export class ArticleRepository implements IArticleRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: ArticlesEntity
  ): Promise<ArticlesEntity> {
    const results: ArticleAttributes = await Article.create(data);

    return results;
  }

  async find(): Promise<ArticlesEntity[]> {
    await this.redisClient.connect();
    // check if patient
    if ((await this.redisClient.get(articleCache)) === null) {
      const results = await Article.findAll({});
      // logger.info({ message: "Fetched from db!" });
      // console.log("fetched from db!");
      // set to cace
      await this.redisClient.set(articleCache, JSON.stringify(results));

      return results;
    }
    const cachedPatients: string | null = await this.redisClient.get(
      articleCache
    );
    if (cachedPatients === null) {
      return [];
    }
    await this.redisClient.disconnect();
    // logger.info({ message: "Fetched from cache!" });
    console.log("fetched from cache!");

    const results: ArticlesEntity[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<ArticlesEntity | null> {
    await this.redisClient.connect();
    if ((await this.redisClient.get(id)) === null) {
      const results: ArticleAttributes | null = await Article.findOne({
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
    const results: ArticleAttributes = JSON.parse(cachedData);
    console.log("fetched from cace!");

    return results;
  }
}
