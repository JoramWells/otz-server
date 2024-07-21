import { FacilityMAPSInterface } from "otz-types";
import { IFacilityMAPRepository } from "../../../application/interfaces/etl/IFacilityMAPRepository";
import { RedisAdapter } from "../redisAdapter";
import { FacilityMAPS } from "../../../domain/models/etl/facilityMAPS.model";



export class FacilityMAPSRepository implements IFacilityMAPRepository {
  // findAllBooksById: (id: string) => Promise<FacilityMAPSInterface[] | null>;
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(data: FacilityMAPSInterface): Promise<FacilityMAPSInterface> {
    await this.redisClient.connect();
    const results: FacilityMAPSInterface = await FacilityMAPS.create(
      data
    );
    // await this.redisClient.del(coursesCache);
    await this.redisClient.disconnect();

    return results;
  }

  async find(): Promise<FacilityMAPSInterface[]> {
    await this.redisClient.connect();
    // check if patient
    const results = await FacilityMAPS.findAll({});
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

    // const results: FacilityMAPSInterface[] = JSON.parse(cachedPatients);
    console.log(results, "rt");

    return results;
  }

  async findById(id: string): Promise<FacilityMAPSInterface | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results: FacilityMAPSInterface | null =
      await FacilityMAPS.findOne({
        where: {
          lineListID: id,
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
    // const results: FacilityMAPSInterface = JSON.parse(cachedData);
    // console.log("fetched from cache!");

    return results;
  }


  //
  async delete(id: string): Promise<number | null> {
    const results = FacilityMAPS.destroy({
      where: {
        id,
      },
    });
    return results;
  }
}
