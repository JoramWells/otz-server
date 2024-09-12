/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import moment from 'moment'
// import { pillUptakeCache } from '../../../constants/appointmentCache'
// import { RedisAdapter } from '../redisAdapter'
import { Sequelize, col, fn } from 'sequelize'
import { type IPillUptakeRepository } from '../../application/interfaces/art/IPillUptakeRepository'
import { Adherence } from '../../domain/models/adherence/adherence.model'
import { TimeAndWork } from '../../domain/models/adherence/timeAndWork.model'
import { Patient } from '../../domain/models/patients.models'
import { Prescription } from '../../domain/models/art/prescription.model'
import { AdherenceAttributes } from "otz-types";
import { RedisAdapter } from './redisAdapter'
import { pillUptakeCache, todaysPillCount } from '../../constants/cache'
export class PillUptakeRepository implements IPillUptakeRepository {
  private readonly redisClient = new RedisAdapter()
  async count() {
    const currentDate = moment().format("YYYY-MM-DD");

    if(await this.redisClient.get(todaysPillCount) === null){
      //
      const results = await Adherence.findOne({
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

      const cachedPatients: string | null = await this.redisClient.get(
        todaysPillCount
      );
      if (cachedPatients === null) {
        return [];
      }
      await this.redisClient.disconnect();
      // logger.info({ message: "Fetched from cache!" });
      console.log("fetched from cache!");

      const results = JSON.parse(cachedPatients);
      return results;

  }

  // private readonly redisClient = new RedisAdapter()
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(data: AdherenceAttributes): Promise<AdherenceAttributes> {
    const {prescriptionID, timeAndWorkID} = data
    if(prescriptionID  || timeAndWorkID){
    if (await this.redisClient.get(prescriptionID?.toString() as string)  || await this.redisClient.get(timeAndWorkID?.toString() as string)) {
      await this.redisClient.del(prescriptionID as string)
      await this.redisClient.del(timeAndWorkID as string);
    }
    }

    await this.redisClient.del(pillUptakeCache)
    await this.redisClient.del(todaysPillCount)

    

    const results: AdherenceAttributes = await Adherence.create(data);

    return results;
  }

  async find(): Promise<AdherenceAttributes[]> {
    const currentDate = moment().format("YYYY-MM-DD");
    // check if patient
    // if ((await this.redisClient.get(pillUptakeCache)) === null) {
    const results = await Adherence.findAll({
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
    // // set to cace
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

    // const results: AdherenceAttributes[] = JSON.parse(cachedPatients);
    return results;
  }

  async findCurrentPillUptake(id: string): Promise<AdherenceAttributes | null> {
    const currentDate = moment().format("YYYY-MM-DD");
// if(await this.redisClient.get(`pill_uptake_${id}`) === null){
    // const recentPrescription = await Prescription.findOne({
    //   attributes: [
    //     [fn("MAX", col("createdAt")), "createdAt"],
    //     "patientID",
    //     "id",
    //   ],
    //   group: ["patientID", "id"],
    //   where: {
    //     patientID: id,
    //   },
    // });

        const recentPrescription = await Prescription.findOne({
          // attributes: [
          //   [fn("MAX", col("createdAt")), "createdAt"],
          //   "patientID",
          //   "id",
          // ],
          // group: ["patientID", "id"],
          order:[['createdAt', 'DESC']],
          where: {
            patientID: id,
          },
        });

    // console.log(recentPrescription?.id, 'pID');

    if (recentPrescription) {
      const currentUptake = await Adherence.findAll({
        limit: 1,
        order: [["createdAt", "DESC"]],
        where: {
          prescriptionID: recentPrescription.id,
          currentDate,
        },
        include: [
          {
            model: TimeAndWork,
            attributes: ["eveningMedicineTime", "morningMedicineTime"],
          },
        ],
      });
      console.log(currentUptake, "uptake!!");

      // await this.redisClient.set(`pill_uptake_${id}`, JSON.stringify(currentUptake));


      // ?index to find the first element
      return currentUptake[0];
    }
    return null;
// }

//     const cachedData: string | null = await this.redisClient.get(id);
//     if (cachedData === null) {
//       return null;
//     }
//     const results: AdherenceAttributes = JSON.parse(cachedData);
//     console.log("fetched appointment from cace!");

//     return results;

  }

  async findByPatientID(id: string): Promise<AdherenceAttributes[] | null> {
    const recentPrescription = await Prescription.findOne({
      order: [["createdAt", "DESC"]],
      where: {
        patientID: id,
      },
    });

    if (recentPrescription) {
      const currentUptake = await Adherence.findAll({
        where: {
          prescriptionID: recentPrescription.id,
        },
        include: [
          {
            model: TimeAndWork,
            attributes: ["eveningMedicineTime", "morningMedicineTime", 'createdAt'],
          },
          {
            model: Prescription,
            attributes:['refillDate', 'nextRefillDate']
          }
        ],
      });
      return currentUptake;
    }
    return null;
  }

  async findById(id: string): Promise<AdherenceAttributes | null> {
    // await this.redisClient.connect()
    if ((await this.redisClient.get(id)) === null) {
    const results: AdherenceAttributes | null = await Adherence.findOne({
      where: {
        id,
      },
    });

      return results
    }

    const cachedData: string | null = await this.redisClient.get(id)
    if (cachedData === null) {
      return null
    }
    const results: AdherenceAttributes = JSON.parse(cachedData)
    console.log('fetched from cace!')

    return results;
  }

  async edit(
    id: string,
    status: boolean,
    query: string
  ): Promise<AdherenceAttributes | null> {
      await this.redisClient.del(pillUptakeCache);
      await this.redisClient.del(todaysPillCount)
      await this.redisClient.del(id);
    if (query === "morning") {
      const results = await Adherence.findOne({
        where: {
          id,
        },
      });

      if (results) {
        const pResults = await Prescription.findOne({
          where: {
            id: results?.prescriptionID,
          },
        });
        console.log(pResults, "mornin..");
        console.log(status, "lko");
        if (pResults) {
          if (status) {
            pResults.computedNoOfPills = pResults?.computedNoOfPills + 1;
          } else {
            pResults.computedNoOfPills = pResults?.computedNoOfPills - 1;
          }
          await pResults?.save();
        }

        results.morningStatus = status;
        return await results.save();
      }
    } else {
      const results = await Adherence.findOne({
        where: {
          id,
        },
      });
      if (results) {
        const pResults = await Prescription.findOne({
          where: {
            id: results?.prescriptionID,
          },
        });
        console.log(pResults, "evnin");
        if (pResults) {
          if (status) {
            pResults.computedNoOfPills = pResults?.computedNoOfPills + 1;
            console.log("substrct..");
          } else {
            pResults.computedNoOfPills = pResults?.computedNoOfPills - 1;
            console.log("added............................................");
          }
          await pResults?.save();
        }

        results.eveningStatus = status;
        await results.save();
      }

      return results;
    }
    return null;
  }
}
