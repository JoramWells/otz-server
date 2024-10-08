// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { ChapterAttributes } from 'otz-types';
import { IChapterRepository } from '../../../application/interfaces/articles/IChapterRepository';
import { chapterCache } from '../../../constants/appointmentCache';
import { Article } from '../../../domain/models/articles/article.model';
import { Books } from '../../../domain/models/articles/books.model';
import { Chapter } from '../../../domain/models/articles/chapters.model';
import { RedisAdapter } from '../redisAdapter'


export class ChapterRepository implements IChapterRepository {
  // findAllBooksById: (id: string) => Promise<ChapterAttributes[] | null>;
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(data: ChapterAttributes): Promise<ChapterAttributes> {
    await this.redisClient.connect();
    const results: ChapterAttributes = await Chapter.create(data);
    await this.redisClient.del(chapterCache);
    await this.redisClient.disconnect();

    return results;
  }

  async find(): Promise<ChapterAttributes[]> {
    await this.redisClient.connect();
    // check if patient
    const results = await Chapter.findAll({
      include: [
        {
          model: Books,
          attributes: ["id", "description", 'thumbnail'],
        },
      ],
    });
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

    // const results: ChapterAttributes[] = JSON.parse(cachedPatients);
    console.log(results, 'rt')
    
    return results;
  }

  async findById(id: string): Promise<ChapterAttributes | null> {
    await this.redisClient.connect();
    if ((await this.redisClient.get(id)) === null) {
      const results: ChapterAttributes | null = await Chapter.findOne({
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
    const results: ChapterAttributes = JSON.parse(cachedData);
    console.log("fetched from cache!");

    return results;
  }

  //
  async findAllBooksById(id: string): Promise<ChapterAttributes[] | null> {
    const results: ChapterAttributes[] | null = await Chapter.findAll({
      where: {
        bookID: id,
      },
      include: [
        {
          model: Books,
        },
        {
          model: Article,
          attributes: ["id"],
        },
      ],
    });

    return results;
  }
}
