// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { Op, col, fn } from 'sequelize';
import { ITimeAndWorkRepository } from '../../../application/interfaces/treatmentplan/ITimeAndWorkRepository'
import { timeAndWorkCache } from '../../../constants/appointmentCache';
import { TimeAndWork  } from '../../../domain/models/treatmentplan/timeAndWork.model'
import { RedisAdapter } from '../redisAdapter'
import { Uptake } from '../../../domain/models/treatmentplan/uptake.model';
import { connect } from '../../../db/connect';
import moment from 'moment';
import { TimeAndWorkAttributes } from 'otz-types';
import { Prescription } from '../../../domain/models/art/prescription.model';


export class TimeAndWorkRepository implements ITimeAndWorkRepository {
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async updateMorningSchedule(
    id: string,
    data: TimeAndWorkAttributes
  ): Promise<TimeAndWorkAttributes | null> {
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
    data: TimeAndWorkAttributes
  ): Promise<TimeAndWorkAttributes | null> {
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

  async create(data: TimeAndWorkAttributes): Promise<TimeAndWorkAttributes> {
    const currentDate = moment().format('YYYY-MM-DD')
    const {patientID} = data
    return await connect.transaction(async(t)=>{

      const results  = await TimeAndWork.create(data, {transaction:t});
          const latestPrescriptions: Prescription | null = await Prescription.findOne({
            attributes: [
              [fn("MAX", col("createdAt")), "createdAt"],
              "patientID",
              'id'
            ],
            group: ["patientID", 'id'],
            where: {
              // patientVisitID: {
              //   [Op.not]: null,
              // },
              patientID,
              createdAt: {
                [Op.not]: null,
              } as any,
            },
          });

          await Uptake.create({
            currentDate,
            prescriptionID:latestPrescriptions?.dataValues.id,
            eveningStatus: false,
            morningStatus: false,
            timeAndWorkID: results.id,
          }, {transaction:t});

    return results;

    

    })

    

  }

  async find(): Promise<TimeAndWorkAttributes[]> {
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

    const results: TimeAndWorkAttributes[] = JSON.parse(cachedPatients);
    return results;
  }

  async findById(id: string): Promise<TimeAndWorkAttributes | null> {
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
    async findByPatientId(id: string): Promise<TimeAndWorkAttributes | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
      const results: TimeAndWorkAttributes | null = await TimeAndWork.findOne({
        order:[['createdAt','DESC']],
        where: {
          patientID:id,
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
