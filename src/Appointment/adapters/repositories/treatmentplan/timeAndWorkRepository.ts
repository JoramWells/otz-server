// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { ITimeAndWorkRepository } from '../../../application/interfaces/treatmentplan/ITimeAndWorkRepository'
import { timeAndWorkCache } from '../../../constants/appointmentCache';
import { TimeAndWorkEntity } from '../../../domain/entities/treatmentplan/TimeAndWorkEntity'
import { TimeAndWork, TimeAndWorkAttributes } from '../../../domain/models/treatmentplan/timeAndWork.model'
import { RedisAdapter } from '../redisAdapter'


export class TimeAndWorkRepository implements ITimeAndWorkRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async updateMorningSchedule(
    id: string,
    data: TimeAndWorkEntity
  ): Promise<TimeAndWorkEntity | null> {
    const {
      wakeUpTime,
      arrivalWorkTime,
      departureHomeTime,
      morningMedicineTime,
      morningPlace,
    } = data;

    const results = await TimeAndWork.findOne({
      where: {
        id,
      },
    });
    if (results !== null) {
      results.wakeUpTime = wakeUpTime;
      results.arrivalWorkTime = arrivalWorkTime;
      results.departureHomeTime = departureHomeTime;
      results.morningMedicineTime = morningMedicineTime;
      results.morningPlace = morningPlace;

      // save()
      results.save();
    }
    return results;
  }
  async updateEveningSchedule(
    id: string,
    data: TimeAndWorkEntity
  ): Promise<TimeAndWorkEntity | null> {
    const {
      departureWorkTime,
      arrivalHomeTime,
      eveningMedicineTime,
      eveningPlace,
    } = data;

    const results = await TimeAndWork.findOne({
      where: {
        id,
      },
    });

    if (results !== null) {
      results.departureWorkTime = departureWorkTime;
      results.arrivalHomeTime = arrivalHomeTime;
      results.eveningMedicineTime = eveningMedicineTime;
      results.eveningPlace = eveningPlace;

      // save()
      results.save();
    }

    return results;
  }

  async create(data: TimeAndWorkEntity): Promise<TimeAndWorkEntity> {
    const results: TimeAndWorkAttributes = await TimeAndWork.create(data);

    return results;
  }

  async find(): Promise<TimeAndWorkEntity[]> {
    await this.redisClient.connect();
    // check if patient
    if ((await this.redisClient.get(timeAndWorkCache)) === null) {
      const results = await TimeAndWork.findAll({});
      // logger.info({ message: "Fetched from db!" });
      // console.log("fetched from db!");
      // set to cace
      await this.redisClient.set(timeAndWorkCache, JSON.stringify(results));

      return results;
    }
    const cachedPatients: string | null = await this.redisClient.get(
      timeAndWorkCache
    );
    if (cachedPatients === null) {
      return [];
    }
    await this.redisClient.disconnect();
    // logger.info({ message: "Fetched from cache!" });
    console.log("fetched from cache!");

    const results: TimeAndWorkEntity[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<TimeAndWorkEntity | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
      const results: TimeAndWorkAttributes | null = await TimeAndWork.findOne({
        order:[['createdAt','DESC']],
        where: {
          patientVisitID:id,
        },
      });

      console.log(results, 'resultX')
      

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
    // const results: TimeAndWorkAttributes = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }
}
