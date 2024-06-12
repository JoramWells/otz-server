
import { IQuestionRepository } from '../../../application/interfaces/articles/IQuestionRepository';
import { QuestionEntity } from '../../../domain/entities/articles/QuestionEntity';
import { Question, QuestionAttributes } from '../../../domain/models/articles/question.model';

import { RedisAdapter } from '../redisAdapter'


export class QuestionRepository implements IQuestionRepository {
  // findAllBooksById: (id: string) => Promise<QuestionEntity[] | null>;
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(data: QuestionEntity[]): Promise<QuestionEntity[]> {
    // await this.redisClient.connect();
    const results: QuestionAttributes[] = await Question.bulkCreate(data);
    // await this.redisClient.del(QuestionCache);
    // await this.redisClient.disconnect();

    return results;
  }

  async find(): Promise<QuestionEntity[]> {
    await this.redisClient.connect();
    // check if patient
    const results = await Question.findAll({
      
    });
    // if ((await this.redisClient.get(QuestionCache)) === null) {
    //   const results = await Question.findAll({
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
    //   await this.redisClient.set(QuestionCache, JSON.stringify(results));

    //   return results;
    // }
    // const cachedPatients: string | null = await this.redisClient.get(
    //   QuestionCache
    // );
    // if (cachedPatients === null) {
    //   return [];
    // }
    // await this.redisClient.disconnect();
    // // logger.info({ message: "Fetched from cache!" });
    // console.log("fetched from cache!");

    // const results: QuestionEntity[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<QuestionEntity | null> {
    await this.redisClient.connect();
    if ((await this.redisClient.get(id)) === null) {
      const results: QuestionAttributes | null = await Question.findOne({
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
      // await this.redisClient.set(id, JSON.stringify(results));

      return results;
    }

    const cachedData: string | null = await this.redisClient.get(id);
    if (cachedData === null) {
      return null;
    }
    const results: QuestionAttributes = JSON.parse(cachedData);
    console.log("fetched from cache!");

    return results;
  }

  //
  async findAllBooksById(id: string): Promise<QuestionEntity[] | null> {
    const results: QuestionAttributes[] | null = await Question.findAll({
      where: {
         id,
      },
    });

    return results;
  }
}
