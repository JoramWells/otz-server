// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import moment from 'moment';
import { IPillUptakeRepository } from '../../../application/interfaces/treatmentplan/IPillUptakeRepository'
import { pillUptakeCache } from '../../../constants/appointmentCache';
import { UptakeEntity } from '../../../domain/entities/treatmentplan/UptakeEntity';
import { Uptake, UptakeAttributes } from '../../../domain/models/treatmentplan/uptake.model';
import { RedisAdapter } from '../redisAdapter'
import { Sequelize } from 'sequelize';
import { TimeAndWork } from '../../../domain/models/treatmentplan/timeAndWork.model';
import { Patient } from '../../../domain/models/patients.models';


export class PillUptakeRepository implements IPillUptakeRepository {
  async count() {
    const currentDate = moment().format("YYYY-MM-DD");

    //
    const results = await Uptake.findOne({
      attributes: [
        [
          Sequelize.literal(
            'SUM(CASE WHEN "morningStatus" = true THEN 1 ELSE 0 END)'
          ),
          "morningTrueCount",
        ],
        [
          Sequelize.literal(
            'SUM(CASE WHEN "morningStatus" = false THEN 1 ELSE 0 END)'
          ),
          "morningFalseCount",
        ],
        [
          Sequelize.literal(
            'SUM(CASE WHEN "eveningStatus" = true THEN 1 ELSE 0 END)'
          ),
          "eveningTrueCount",
        ],
        [
          Sequelize.literal(
            'SUM(CASE WHEN "eveningStatus" = false THEN 1 ELSE 0 END)'
          ),
          "eveningFalseCount",
        ],
      ],
      where: {
        currentDate,
      },
    });

    return results;
  }
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(data: UptakeEntity): Promise<UptakeEntity> {
    const results: UptakeAttributes = await Uptake.create(data);

    return results;
  }

  async find(): Promise<UptakeEntity[]> {
    const currentDate = moment().format("YYYY-MM-DD");
    // await this.redisClient.connect();
    // check if patient
    // if ((await this.redisClient.get(pillUptakeCache)) === null) {
    const results = await Uptake.findAll({
      where: {
        currentDate,
      },
      include: {
        model: TimeAndWork,
        attributes: ["id", "morningMedicineTime", "eveningMedicineTime"],
        include: [
          {
            model: Patient,
            attributes: ["id", "firstName", "middleName"],
          },
        ],
      },
    });

    // logger.info({ message: "Fetched from db!" });
    // console.log("fetched from db!");
    // set to cace
    //   await this.redisClient.set(pillUptakeCache, JSON.stringify(results));

    //   return results;
    // }
    // const cachedPatients: string | null = await this.redisClient.get(
    //   pillUptakeCache
    // );
    // if (cachedPatients === null) {
    //   return [];
    // }
    // await this.redisClient.disconnect();
    // logger.info({ message: "Fetched from cache!" });
    // console.log("fetched from cache!");

    // const results: UptakeEntity[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<UptakeEntity | null> {
    await this.redisClient.connect();
    if ((await this.redisClient.get(id)) === null) {
      const results: UptakeAttributes | null = await Uptake.findOne({
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
    const results: UptakeAttributes = JSON.parse(cachedData);
    console.log("fetched from cace!");

    return results;
  }
  async edit(id: string, status: boolean,query: ParsedQs): Promise<UptakeEntity | null> {
    if(query === 'morning'){

        const results = await Uptake.findOne({
          where: {
            id,
          },
        });
        if (results) {
          results.morningStatus = status;
          results.save();
        }
    }

        const results = await Uptake.findOne({
          where: {
            id,
          },
        });
        if(results){
          results.eveningStatus = status;
          results.save()

        }


    return results;
  }
}
