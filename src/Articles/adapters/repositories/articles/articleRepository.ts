// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { ArticleAttributes } from 'otz-types'
import { IArticleRepository } from '../../../application/interfaces/articles/IArticleRepository'
import { articleCache } from '../../../constants/appointmentCache'
import { Article  } from '../../../domain/models/articles/article.model'
import { Books } from '../../../domain/models/articles/books.model'
import { Chapter } from '../../../domain/models/articles/chapters.model'
import { RedisAdapter } from '../redisAdapter'


export class ArticleRepository implements IArticleRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(data: ArticleAttributes): Promise<ArticleAttributes> {
    await this.redisClient.connect();
    const results: ArticleAttributes = await Article.create(data);
    await this.redisClient.del(articleCache);
    await this.redisClient.disconnect();

    return results;
  }

  async find(): Promise<ArticleAttributes[]> {
    await this.redisClient.connect();
    // check if patient
    const results = await Article.findAll({
      include: [
        {
          model: Chapter,
          attributes: ["id", "description"],
        },
      ],
    });

    // if ((await this.redisClient.get(articleCache)) === null) {
    //   const results = await Article.findAll({
    //     include:[
    //       {
    //         model:ArticleCategory,
    //         attributes:['id','description']
    //       }
    //     ]
    //   });
    //   // logger.info({ message: "Fetched from db!" });
    //   // console.log("fetched from db!");
    //   // set to cace
    //   await this.redisClient.set(articleCache, JSON.stringify(results));

    //   return results;
    // }
    // const cachedPatients: string | null = await this.redisClient.get(
    //   articleCache
    // );
    // if (cachedPatients === null) {
    //   return [];
    // }
    // await this.redisClient.disconnect();
    // // logger.info({ message: "Fetched from cache!" });
    // console.log("fetched from cache!");

    // const results: ArticleAttributes[] = JSON.parse(cachedPatients);
    return results;
  }

  async findAllArticleChaptersById(
    id: string
  ): Promise<ArticleAttributes[] | null> {
    await this.redisClient.connect();
    const results: ArticleAttributes[] | null = await Article.findAll({
      where: {
        chapterID: id,
      },
      include:[
        {
          model: Chapter,
          attributes:['id','description'],
          include:[
            {
              model: Books,
              attributes:['id', 'description', 'thumbnail']
            }
          ]
        }
      ]
    });
    // 
    
    return results;
  }

  async findById(id: string): Promise<ArticleAttributes | null> {
    await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
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
    //   await this.redisClient.set(id, JSON.stringify(results));

    //   return results;
    // }

    // const cachedData: string | null = await this.redisClient.get(id);
    // if (cachedData === null) {
    //   return null;
    // }
    // const results: ArticleAttributes = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }

  async delete(id: string): Promise<number | null> {
    await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results = await Article.destroy({
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

  async edit(data: ArticleAttributes): Promise<ArticleAttributes | null> {
    const {id, chapterID,content,image,title} = data;
    await this.redisClient.connect()
    const results = await Article.findOne({
      where: {
        id,
      },
    });

    if (results) {
      results.content = content;
      results.image = image;
      results.title = title;
      await results.save();
    }
    await this.redisClient.del(id)
    return results;
  }
}
