// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { IArticleCategoryRepository } from '../../../application/interfaces/articles/IArticleCategoryRepository'
import { articleCategoryCache } from '../../../constants/appointmentCache';
import { ArticlesCategoryEntity } from '../../../domain/entities/articles/ArticleCategoryEntity'
import { ArticleCategory, ArticleCategoryAttributes } from '../../../domain/models/articles/articleCategory.model'
import { RedisAdapter } from '../redisAdapter'


export class ArticleCategoryRepository implements IArticleCategoryRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(data: ArticlesCategoryEntity): Promise<ArticlesCategoryEntity> {
    await this.redisClient.connect();
    const results: ArticleCategoryAttributes = await ArticleCategory.create(
      data
    );

    await this.redisClient.del(articleCategoryCache);

    // fetch categories
    // const savedResults = await ArticleCategory.findAll({})
    // await this.redisClient.set(articleCategoryCache, JSON.stringify(savedResults) )
    await this.redisClient.disconnect();

    return results;
  }

  async find(): Promise<ArticlesCategoryEntity[]> {
    const results = await ArticleCategory.findAll({});
    // await this.redisClient.connect();
    // // check if patient
    // if ((await this.redisClient.get(articleCategoryCache)) === null) {
    //   const results = await ArticleCategory.findAll({});
    //   // logger.info({ message: "Fetched from db!" });
    //   // console.log("fetched from db!");
    //   // set to cace
    //   await this.redisClient.set(articleCategoryCache, JSON.stringify(results));

    //   return results;
    // }
    // const cachedPatients: string | null = await this.redisClient.get(
    //   articleCategoryCache
    // );
    // if (cachedPatients === null) {
    //   return [];
    // }
    // await this.redisClient.disconnect();
    // // logger.info({ message: "Fetched from cache!" });
    // console.log("fetched from cache!");

    // const results: ArticlesCategoryEntity[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<ArticlesCategoryEntity | null> {
    await this.redisClient.connect();
    if ((await this.redisClient.get(id)) === null) {
      const results: ArticleCategoryAttributes | null =
        await ArticleCategory.findOne({
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
    const results: ArticleCategoryAttributes = JSON.parse(cachedData);
    console.log("fetched from cace!");

    return results;
  }

  //
  async delete(id: string): Promise<number | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results = await ArticleCategory.destroy({
      where: {
        id,
      },
    });

    // await this.redisClient.set(id, JSON.stringify(results));

    return results;
    // }

    // const cachedData: string | null = await this.redisClient.get(id);
    // if (cachedData === null) {
    //   return null;
    // }
    // const results: ArticleAttributes = JSON.parse(cachedData);
    // console.log("fetched from cace!");
  }
}
