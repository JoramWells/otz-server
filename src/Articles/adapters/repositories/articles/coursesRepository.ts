// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { ICoursesRepository } from '../../../application/interfaces/articles/ICoursesRepository';
import { coursesCache } from '../../../constants/appointmentCache';
import { CoursesEntity } from '../../../domain/entities/articles/CoursesEntity';
import { Books } from '../../../domain/models/articles/books.model';
import { Courses, CoursesAttributes } from '../../../domain/models/articles/courses.model';
import { RedisAdapter } from '../redisAdapter'


export class CoursesRepository implements ICoursesRepository {
  // findAllBooksById: (id: string) => Promise<CoursesEntity[] | null>;
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(data: CoursesEntity): Promise<CoursesEntity> {
    await this.redisClient.connect();
    const results: CoursesAttributes = await Courses.create(data);
    await this.redisClient.del(coursesCache);
    await this.redisClient.disconnect();

    return results;
  }

  async find(): Promise<CoursesEntity[]> {
    await this.redisClient.connect();
    // check if patient
    const results = await Courses.findAll({
      include: [
        {
          model: Books,
          attributes: ["id", "description"],
        },
      ],
    });
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

    // const results: CoursesEntity[] = JSON.parse(cachedPatients);
    console.log(results, 'rt')
    
    return results;
  }

  async findById(id: string): Promise<CoursesEntity | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
      const results: CoursesAttributes | null = await Courses.findAll({
        where: {
          patientID: id,
        },
        include: [
          {
            model: Books,
            attributes: ["id", "description", 'thumbnail'],
          },
        ],
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
    // const results: CoursesAttributes = JSON.parse(cachedData);
    // console.log("fetched from cache!");

    return results;
  }

  //
  async findAllCoursesById(id: string): Promise<CoursesEntity[] | null> {
    const results: CoursesAttributes[] | null = await Courses.findAll({
      where: {
        bookID: id,
      },
      include: [
        {
          model: Books,
          attributes: ["id", "description", "thumbnail"],
        },
      ],
    });

    return results;
  }
}
