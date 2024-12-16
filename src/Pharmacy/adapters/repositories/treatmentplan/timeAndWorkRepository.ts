// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { Op, WhereOptions, col, fn } from "sequelize";
import { TimeAndWork } from "../../../domain/models/treatmentplan/timeAndWork.model";
import { Uptake } from "../../../domain/models/treatmentplan/uptake.model";
import moment from "moment";
import { TimeAndWorkAttributes } from "otz-types";
import { Prescription } from "../../../domain/models/art/prescription.model";
import { connect } from "../../../domain/db/connect";
import { RedisAdapter } from "../redisAdapter";
import { ITimeAndWorkRepository } from "../../../application/interfaces/treatmentplan/ITimeAndWorkRepository";
import { timeAndWorkCache } from "../../../constants/cache";
import {
  calculateLimitAndOffset,
  calculateMaxAge,
} from "../../../utils/calculateLimitAndOffset";
import { Patient } from "../../../domain/models/patients.models";
import { TimeAndWorkResponseInterface } from "../../../entities/TimeAndWorkResponseInterface";
import { validate as isUUID } from "uuid";

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
      eveningMedicineTime,
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
      results.eveningMedicineTime = eveningMedicineTime;

      // save()
      results.save();
    }
    return results;
  }

  //
  async editSchedule(
    id: string,
    data: TimeAndWorkAttributes
  ): Promise<TimeAndWorkAttributes | null> {
    const { morningMedicineTime, eveningMedicineTime } = data;

    console.log(data, "datam");

    const results = await TimeAndWork.findOne({
      where: {
        id,
      },
    });
    if (results !== null) {
      if (!morningMedicineTime || !eveningMedicineTime) {
        results.morningMedicineTime = null;
        results.eveningMedicineTime = null;
      }
      results.morningMedicineTime = morningMedicineTime;
      results.eveningMedicineTime = eveningMedicineTime;

      // save()
      results.save();
    }
    return results;
  }

  //
  async updateEveningSchedule(
    id: string,
    data: TimeAndWorkAttributes
  ): Promise<TimeAndWorkAttributes | null> {
    const {
      departureWorkTime,
      arrivalHomeTime,
      eveningMedicineTime,
      eveningPlace,
      morningMedicineTime,
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
      results.morningMedicineTime = morningMedicineTime;
      results.eveningPlace = eveningPlace;

      // save()
      results.save();
    }

    return results;
  }

  async create(data: TimeAndWorkAttributes): Promise<TimeAndWorkAttributes> {
    const currentDate = moment().format("YYYY-MM-DD");
    console.log(data, "datas");
    const { patientID } = data;
    return await connect.transaction(async (t) => {
      const results = await TimeAndWork.create(data, { transaction: t });
      const latestPrescriptions: Prescription | null =
        await Prescription.findOne({
          attributes: [
            [fn("MAX", col("createdAt")), "createdAt"],
            "patientID",
            "id",
          ],
          group: ["patientID", "id"],
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

      await Uptake.create(
        {
          currentDate,
          prescriptionID: latestPrescriptions?.dataValues.id,
          eveningStatus: false,
          morningStatus: false,
          timeAndWorkID: results.id,
        },
        { transaction: t }
      );

      return results;
    });
  }

  async find(
    hospitalID?: string,
    page?: string,
    pageSize?: string,
    searchQuery?: string
  ): Promise<TimeAndWorkResponseInterface | undefined | null> {
    // await this.redisClient.connect();
    // // check if patient
    // if ((await this.redisClient.get(timeAndWorkCache)) === null) {
    //   const results = await TimeAndWork.findAll({});
    //   // logger.info({ message: "Fetched from db!" });
    //   // console.log("fetched from db!");
    //   // set to cace
    //   await this.redisClient.set(timeAndWorkCache, JSON.stringify(results));

    //   return results;
    // }
    // const cachedPatients: string | null = await this.redisClient.get(
    //   timeAndWorkCache
    // );
    // if (cachedPatients === null) {
    //   return [];
    // }
    // await this.redisClient.disconnect();
    // // logger.info({ message: "Fetched from cache!" });
    // console.log("fetched from cache!");

    // const results: TimeAndWorkAttributes[] = JSON.parse(cachedPatients);
    // return results;
    try {
      const maxDate = calculateMaxAge(25);
      const { limit, offset } = calculateLimitAndOffset(page, pageSize);

      //
      let where: WhereOptions = {
        dob: {
          [Op.gte]: maxDate,
        },
      };
      //
      if (isUUID(hospitalID)) {
        where = {
          ...where,
          hospitalID,
        };
      }

      //
      if (searchQuery && searchQuery?.length > 0) {
        where = {
          ...where,
          [Op.or]: [
            { firstName: { [Op.iLike]: `${searchQuery}%` } },
            { middleName: { [Op.iLike]: `${searchQuery}%` } },
            { cccNo: { [Op.iLike]: `${searchQuery}%` } },
          ],
        };
      }

      //

      const { rows, count } = await TimeAndWork.findAndCountAll({
        limit,
        offset,
        include: [
          {
            model: Patient,
            attributes: ["firstName", "middleName"],
            where,
          },
        ],
      });
      return {
        data: rows,
        total: count,
        page: page,
        pageSize: limit,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async findById(
    id: string
  ): Promise<TimeAndWorkAttributes | null | undefined> {
    try {
      // await this.redisClient.connect();
      // if ((await this.redisClient.get(id)) === null) {
      const results = await TimeAndWork.findOne({
        where: {
          id,
        },
      });
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async findByVisitId(
    id: string
  ): Promise<TimeAndWorkAttributes | null | undefined> {
    try {
      // await this.redisClient.connect();
      // if ((await this.redisClient.get(id)) === null) {
      const results = await TimeAndWork.findOne({
        where: {
          patientVisitID: id,
        },
      });
      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async findByPatientId(id: string): Promise<TimeAndWorkAttributes | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results: TimeAndWorkAttributes | null = await TimeAndWork.findOne({
      order: [["createdAt", "DESC"]],
      where: {
        patientID: id,
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
    // const results: TimeAndWorkAttributes = JSON.parse(cachedData);
    // console.log("fetched from cace!");

    return results;
  }
  async delete(id: string): Promise<number | null> {
    // await this.redisClient.del(patientCache);
    // await this.redisClient.del(id as string);
    const results: number | null = await TimeAndWork.destroy({
      where: {
        id,
      },
    });
    console.log("deleted cache!!");

    return results;
  }

  //
  async findRecent(
    hospitalID?: string
  ): Promise<TimeAndWorkAttributes[] | null | undefined> {
    try {
      let where = {};

      if (isUUID(hospitalID)) {
        where = {
          ...where,
          hospitalID,
        };
      }

      const results = await TimeAndWork.findAll({
        order: [["createdAt", "DESC"]],
        attributes: [
          "morningMedicineTime",
          "eveningMedicineTime",
          "toolsAndCues",
          "createdAt",
        ],
        limit: 5,
        include: [
          {
            model: Patient,
            attributes: ["firstName", "middleName"],
            where: {
              hospitalID,
            },
          },
        ],
      });
      return results;
    } catch (error) {
      console.log(error);
    }
  }
}
