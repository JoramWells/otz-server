// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { IChapterRepository } from '../../../application/interfaces/articles/IChapterRepository';
import { chapterCache } from '../../../constants/appointmentCache';
import { ChapterEntity } from '../../../domain/entities/articles/ChapterEntity';
import { ArticleCategory } from '../../../domain/models/articles/articleCategory.model';
import { Chapter, ChapterAttributes } from '../../../domain/models/articles/chapters.model';
import { RedisAdapter } from '../redisAdapter'


export class ChapterRepository implements IChapterRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: ChapterEntity
  ): Promise<ChapterEntity> {
     await this.redisClient.connect();
    const results: ChapterAttributes = await Chapter.create(data);
    await this.redisClient.del(chapterCache)
    await this.redisClient.disconnect()

    return results;
  }

  async find(): Promise<ChapterEntity[]> {
    await this.redisClient.connect();
    // check if patient
          const results = await Chapter.findAll({
            include: [
              {
                model: ArticleCategory,
                attributes: ["id", "description"],
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

    // const results: ChapterEntity[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<ChapterEntity | null> {
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
}
