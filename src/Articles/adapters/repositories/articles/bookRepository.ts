// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { BookAttributes } from 'otz-types';
import { IBookRepository } from '../../../application/interfaces/articles/IBookRepository';
import { articleCategoryCache } from '../../../constants/appointmentCache';
import {  Books } from '../../../domain/models/articles/books.model';
import { Chapter } from '../../../domain/models/articles/chapters.model';
import { RedisAdapter } from '../redisAdapter'


export class ArticleCategoryRepository implements IBookRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(data: BookAttributes): Promise<BookAttributes> {
    await this.redisClient.connect();
    const results: BookAttributes = await Books.create(
      data
    );

    await this.redisClient.del(articleCategoryCache);

    // fetch categories
    // const savedResults = await ArticleCategory.findAll({})
    // await this.redisClient.set(articleCategoryCache, JSON.stringify(savedResults) )
    await this.redisClient.disconnect();

    return results;
  }

  async find(): Promise<BookAttributes[]> {
    const results = await Books.findAll({
      include:[
        {
          model: Chapter,
          attributes:['id']
        }
      ]
    });
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

    // const results: BookAttributes[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<BookAttributes | null> {
    await this.redisClient.connect();
    if ((await this.redisClient.get(id)) === null) {
      const results: BookAttributes | null =
        await Books.findOne({
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
    const results: BookAttributes = JSON.parse(cachedData);
    console.log("fetched from cace!");

    return results;
  }

  //
  async delete(id: string): Promise<number | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results = await Books.destroy({
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
