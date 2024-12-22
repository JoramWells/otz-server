/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { col, fn, Op } from "sequelize";
import { IAppointmentRepository } from "../../application/interfaces/appointment/IAppointmentRepository";
import { appointmentCache } from "../../constants/appointmentCache";
import {
  Appointment,
  AppointmentResponseInterface,
} from "../../domain/models/appointment/appointment.model";
import { AppointmentAgenda } from "../../domain/models/appointment/appointmentAgenda.model";
import { AppointmentStatus } from "../../domain/models/appointment/appointmentStatus.model";
import { Patient } from "../../domain/models/patients.models";
import { User } from "../../domain/models/user.model";
// import { logger } from '../../utils/logger'
import { RedisAdapter } from "./redisAdapter";
import { connect } from "../../db/connect";
import { AppointmentAttributes } from "otz-types";
import { UniqueAppointmentInterface } from "../../entities/UniqueAppointmentAgendaEntity";
import { ImportantPatient } from "../../domain/models/importantPatients";
import {
  calculateLimitAndOffset,
  calculateMaxAge,
} from "../../utils/calculateLimitAndOffset";
import { validate as isUUID } from "uuid";
import { PatientVisits } from "../../domain/models/patientVisits.model";

// import { createClient } from 'redis'

const getWeekRange = (date: Date) => {
  const startOfWeek = new Date(date);
  const endOfWeek = new Date(date);

  startOfWeek.setDate(date.getDate() - date.getDay());
  endOfWeek.setDate(date.getDate() + (6 - date.getDay()));

  return {
    start: startOfWeek.toISOString().split("T")[0],
    end: endOfWeek.toISOString().split("T")[0],
  };
};

//
const getMonthRange = (date: Date) => {
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return {
    start: startOfMonth.toISOString().split("T")[0],
    end: endOfMonth.toISOString().split("T")[0],
  };
};

//
export class AppointmentRepository implements IAppointmentRepository {
  private readonly redisClient = new RedisAdapter();

  async findAllPriorityAppointments(
    hospitalID: string
  ): Promise<AppointmentAttributes[] | null | undefined> {
    try {
      return await Appointment.findAll({
        order: [["updatedAt", "DESC"]],
        limit: 5,
        include: [
          {
            model: Patient,
            attributes: ["id", "firstName", "middleName", "isImportant"],
            where: {
              hospitalID,
            },
          },
          {
            model: AppointmentStatus,
            attributes: ["id", "statusDescription"],
            where: {
              statusDescription: "Upcoming",
            },
          },
          {
            model: AppointmentAgenda,
            attributes: ["id", "agendaDescription"],
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }

  //

  async markAsStarred(
    id: string,
    patientID: string,
    status: boolean
  ): Promise<string | null> {
    const isTrue = await Appointment.findByPk(id);
    const appointmentDetailID = `appointment_detail_${id}`;

    await this.redisClient.connect();
    await this.redisClient.del(appointmentCache);
    await this.redisClient.del(id);
    await this.redisClient.del(patientID);
    await this.redisClient.del(appointmentDetailID);
    if (isTrue) {
      isTrue.isStarred = status;
      await isTrue.save();
    }

    return null;
  }

  //
  async markAsRead(id: string): Promise<boolean | null> {
    const result = await Appointment.findByPk(id);
    const appointmentDetailID = `appointment_detail_${id}`;

    await this.redisClient.connect();
    await this.redisClient.del(appointmentCache);
    await this.redisClient.del(id);
    await this.redisClient.del(appointmentDetailID);

    if (result) {
      result.isRead = true;
      result.save();
      return result as any;
    }
    return null;
  }

  //
  async reschedule(
    id: string,
    reason: string,
    rescheduledDate: string
  ): Promise<boolean | null> {
    const result = await Appointment.findByPk(id);
    const rescheduleID = await AppointmentStatus.findOne({
      where: {
        statusDescription: "Rescheduled",
      },
    });

    // console.log(rescheduleID, 'reschedule id')

    if (result && rescheduleID !== null) {
      result.appointmentStatusID = rescheduleID.id;
      result.rescheduledReason = reason;
      result.rescheduledDate = rescheduledDate;
      result.appointmentDate = rescheduledDate;
      result.isRead = false;
      result.save();
      return result as any;
    }
    return null;
  }

  async findPriorityAppointmentDetail(
    id: string
  ): Promise<AppointmentAttributes[] | null> {
    return await Appointment.findAll({
      where: {
        patientID: id,
      },
      include: [
        {
          model: AppointmentStatus,
          attributes: ["id", "statusDescription"],
          where: {
            statusDescription: "Upcoming",
          },
        },
        {
          model: AppointmentAgenda,
          attributes: ["id", "agendaDescription"],
        },
      ],
    });
  }

  //
  async findUniqueAppointmentAgenda(
    hospitalID: string,
    dateQuery: string
  ): Promise<UniqueAppointmentInterface[] | null | undefined> {
    const currentDate = new Date(); // Ensure currentDate is not mutated
    const maxDate = calculateMaxAge(24);
    try {
      let where = {};

      if (dateQuery === "weekly") {
        const { start, end } = getWeekRange(currentDate);

        where = {
          appointmentDate: {
            [Op.between]: [start, end],
          },
        };
      } else if (dateQuery === "monthly") {
        const { start, end } = getMonthRange(currentDate);
        where = {
          appointmentDate: {
            [Op.between]: [start, end],
          },
        };
      }

      const results = await Appointment.findAll({
        where,
        attributes: [
          [col("AppointmentAgenda.agendaDescription"), "agendaDescription"],
          "appointmentDate",
          [col("AppointmentStatus.statusDescription"), "statusDescription"],
          [fn("COUNT", col("agendaDescription")), "count"],
        ],
        group: [
          "AppointmentAgenda.agendaDescription",
          "AppointmentStatus.statusDescription",
          "appointmentDate",
        ],
        include: [
          {
            model: Patient,
            where: {
              hospitalID,
              dob: {
                [Op.gte]: maxDate,
              },
            },
            attributes: [],
          },
          {
            model: AppointmentStatus,
            attributes: [],
          },
          {
            model: AppointmentAgenda,
            attributes: [],
          },
        ],
      });

      interface DynamicResult {
        dataValues: {
          agendaDescription?: string;
          count?: number;
          statusDescription?: string;
          appointmentDate?: string;
        };
      }

      return results.map((result: DynamicResult) => {
        const value: Partial<UniqueAppointmentInterface> = {};
        const agenda = result.dataValues.agendaDescription;
        const count = result.dataValues.count;
        (value[agenda!] = count),
          (value.appointmentDate = result.dataValues.appointmentDate);
        value.agendaDescription = agenda;
        value.status = result.dataValues.statusDescription;
        value.count = count;

        return value;
        // return {
        // appointmentDate: result.dataValues.appointmentDate,
        // statusDescription: result.dataValues.statusDescription,
        // count: result.dataValues.count,
        // }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async create(data: AppointmentAttributes): Promise<AppointmentAttributes> {
    return await connect.transaction(async (t) => {
      let results: AppointmentAttributes = await Appointment.create(data, {
        transaction: t,
      });

      console.log("Running transaction data...!!!", results);

      // if (results) {
      //   await PatientVisits.create(data, { transaction: t });
      // }

      const { patientID } = data;

      if ((await this.redisClient.get(patientID.toString())) !== null) {
        // delete individual patientCache in the db!!
        await this.redisClient.del(patientID);
      }

      // ?delete entire appointment cache
      await this.redisClient.del(appointmentCache);

      return results;
    });

    // await this.redisClient.disconnect()

    // return results;
  }

  async find(
    dateQuery: string,
    hospitalID: string,
    page?: number | string,
    pageSize?: number | string,
    searchQuery?: string,
    status?: string,
    agenda?: string
  ): Promise<AppointmentResponseInterface | null | undefined> {
    // await this.redisClient.connect();
    // check if patient

    let statusFound = false;
    let appointmentStatus;
    let appointmentAgenda;

    if (status) {
      appointmentStatus = await AppointmentStatus.findOne({
        where: {
          statusDescription: { [Op.iLike]: status.toLowerCase() },
        },
      });
      if (appointmentStatus) {
        statusFound = true;
      }
    }

    if (agenda) {
      appointmentAgenda = await AppointmentAgenda.findOne({
        where: {
          agendaDescription: { [Op.iLike]: agenda.toLowerCase() },
        },
      });
    }

    try {
      const currentDate = new Date();
      const maxDate = calculateMaxAge(24);

      let where = {
        // hospitalID,
        dob: {
          [Op.gte]: maxDate,
        },
      };

      let appointmentWhere = {};

      // searc strin
      if (searchQuery) {
        where = {
          ...where,
          [Op.or]: [
            { firstName: { [Op.iLike]: `%${searchQuery}%` } },
            { middleName: { [Op.iLike]: `%${searchQuery}%` } },
            { cccNo: { [Op.iLike]: `%${searchQuery}%` } },
            { lastName: { [Op.iLike]: `%${searchQuery}%` } },
          ],
        };
      }

      if (statusFound && appointmentStatus) {
        appointmentWhere = {
          ...appointmentWhere,
          appointmentStatusID: appointmentStatus.id,
        };
      }

      if (appointmentAgenda) {
        appointmentWhere = {
          ...appointmentWhere,
          appointmentAgendaID: appointmentAgenda.id,
        };
      }

      const { limit, offset } = calculateLimitAndOffset(page, pageSize);

      if (dateQuery === "weekly") {
        const { start, end } = getWeekRange(currentDate);
        appointmentWhere = {
          ...appointmentWhere,
          appointmentDate: {
            [Op.between]: [start, end],
          },
        };
      } else if (dateQuery === "monthly") {
        const { start, end } = getMonthRange(currentDate);
        appointmentWhere = {
          ...appointmentWhere,
          appointmentDate: {
            [Op.between]: [start, end],
          },
        };
      }

      let userWhere = {};

      if (isUUID(hospitalID)) {
        userWhere = {
          ...userWhere,
          hospitalID,
        };
      }

      // if ((await this.redisClient.get(appointmentCache)) === null) {
      const { rows, count } = await Appointment.findAndCountAll({
        where: appointmentWhere,
        order: [["createdAt", "DESC"]],
        limit,
        offset,
        include: [
          {
            model: Patient,
            attributes: ["firstName", "middleName", "dob", "sex"],
            where,
          },
          {
            model: User,
            attributes: ["id", "firstName", "middleName"],
            where: userWhere,
          },
          {
            model: AppointmentAgenda,
            attributes: ["id", "agendaDescription"],
          },
          {
            model: AppointmentStatus,
            attributes: ["id", "statusDescription"],
          },
        ],
      });
      // logger.info({ message: "Fetched from db!" });
      // console.log("fetched from db!");
      // set to cace
      // await this.redisClient.set(appointmentCache, JSON.stringify(results));

      return {
        data: rows,
        total: count,
        page: page,
        pageSize: limit,
      };
    } catch (error) {
      console.log(error);
    }
    // }
    // const cachedPatients: string | null = await this.redisClient.get(
    //   appointmentCache
    // );
    // if (cachedPatients === null) {
    //   return [];
    // }
    // await this.redisClient.disconnect();
    // logger.info({ message: "Fetched from cache!" });
    // console.log("fetched from cache!");

    // const results: AppointmentAttributes[] = JSON.parse(cachedPatients);
    // return results;
  }

  //
  async findRecentAppointmentByPatientID(
    id: string,
    agenda: string
  ): Promise<AppointmentAttributes | null> {
    // if ((await this.redisClient.get(id)) === null) {

    const currentDate = new Date();

    const appointmentStatus = await AppointmentStatus.findOne({
      where: {
        statusDescription: "Completed",
      },
    });

    const appointmentAgenda = await AppointmentAgenda.findOne({
      where: {
        agendaDescription: agenda,
      },
    });

    if (appointmentStatus && appointmentAgenda) {
      const results = await Appointment.findOne({
        order: [["createdAt", "DESC"]],
        where: {
          patientID: id,
          appointmentAgendaID: appointmentAgenda.id,
          createdAt: {
            [Op.not]: currentDate,
          },
        } as any,
      });

      if (results) {
        results.appointmentStatusID = appointmentStatus.id;
        await results.save();
      }

      return results;
    }

    // await this.redisClient.set(id, JSON.stringify(results));

    return null;
    // }

    // const cachedData: string | null = await this.redisClient.get(id);
    // if (cachedData === null) {
    //   return null;
    // }
    // const results: AppointmentAttributes[] = JSON.parse(cachedData);
    // console.log("fetched appointment from cace!");

    // return results;
  }

  //
  async findPatientAppointmentByID(
    id: string
  ): Promise<AppointmentAttributes[] | null> {
    // if ((await this.redisClient.get(id)) === null) {
    const results: AppointmentAttributes[] | null = await Appointment.findAll({
      where: {
        patientID: id,
      },
      include: [
        {
          model: AppointmentAgenda,
          attributes: ["agendaDescription"],
        },
        {
          model: AppointmentStatus,
          attributes: ["statusDescription"],
        },
        {
          model: User,
          attributes: ["firstName", "middleName"],
        },
        {
          model: Patient,
          attributes: ["firstName", "middleName"],
        },
      ],
    });

    await this.redisClient.set(id, JSON.stringify(results));

    return results;
    // }

    // const cachedData: string | null = await this.redisClient.get(id);
    // if (cachedData === null) {
    //   return null;
    // }
    // const results: AppointmentAttributes[] = JSON.parse(cachedData);
    // console.log("fetched appointment from cace!");

    // return results;
  }

  async findAllAppointmentById(
    id: string
  ): Promise<AppointmentAttributes[] | null> {
    const results = await Appointment.findAll({
      where: {
        id,
      },
      include: [
        {
          model: AppointmentAgenda,
          attributes: ["agendaDescription"],
        },
        {
          model: AppointmentStatus,
          attributes: ["statusDescription"],
        },
        {
          model: User,
          attributes: ["firstName", "middleName"],
        },
        {
          model: Patient,
          attributes: ["firstName", "middleName"],
        },
      ],
    });
    return results;
  }

  async findById(id: string): Promise<AppointmentAttributes | null> {
    const appointmentDetailID = `appointment_detail_${id}`;
    // await this.redisClient.connect();
    if ((await this.redisClient.get(appointmentDetailID)) === null) {
      const results: AppointmentAttributes | null = await Appointment.findOne({
        where: {
          id,
        },
        include: [
          {
            model: AppointmentAgenda,
            attributes: ["agendaDescription"],
          },
          {
            model: AppointmentStatus,
            attributes: ["statusDescription"],
          },
          {
            model: User,
            attributes: ["firstName", "middleName"],
          },
          {
            model: Patient,
            attributes: ["firstName", "middleName"],
          },
        ],
      });

      await this.redisClient.set(appointmentDetailID, JSON.stringify(results));

      return results;
    }

    const cachedData: string | null = await this.redisClient.get(
      appointmentDetailID
    );
    if (cachedData === null) {
      return null;
    }
    const results: AppointmentAttributes = JSON.parse(cachedData);
    console.log("fetched from cace!");

    return results;
  }

  //
  async findStarredPatientAppointments(
    hospitalID?: string,
    page?: number | string,
    pageSize?: number | string,
    searchQuery?: string
  ): Promise<AppointmentResponseInterface | null | undefined> {
    // await this.redisClient.connect();

    const { limit, offset } = calculateLimitAndOffset(page, pageSize);

    const importantPatient = await ImportantPatient.findAll({
      include: [
        {
          model: Patient,
          where: {
            hospitalID,
          },
          attributes: [],
        },
      ],
      attributes: ["patientID"],
    });

    const importantPatientIDs = importantPatient.map(
      (patient) => patient.patientID
    );

    const where = searchQuery
      ? {
          [Op.or]: [
            { firstName: { [Op.iLike]: `%${searchQuery}%` } },
            { middleName: { [Op.iLike]: `%${searchQuery}%` } },
            { cccNo: { [Op.iLike]: `%${searchQuery}%` } },
            { lastName: { [Op.iLike]: `%${searchQuery}%` } },
          ],
          hospitalID,
          // dob: {
          //   [Op.lte]: maxDate,
          // },
          id: {
            [Op.in]: importantPatientIDs,
          },
        }
      : {
          hospitalID,
          // dob: {
          //   [Op.lte]: maxDate,
          // },
          id: {
            [Op.in]: importantPatientIDs,
          },
        };

    try {
      const { rows, count } = await Appointment.findAndCountAll({
        order: [["createdAt", "DESC"]],
        limit,
        offset,
        include: [
          {
            model: AppointmentAgenda,
            attributes: ["agendaDescription"],
          },
          {
            model: AppointmentStatus,
            attributes: ["statusDescription"],
          },
          {
            model: User,
            attributes: ["firstName", "middleName"],
          },
          {
            model: Patient,
            attributes: ["firstName", "middleName"],
            where,
            // return: true,
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

  //
  async findAppointmentByPatientID(
    id: string
  ): Promise<AppointmentAttributes | null | undefined> {
    try {
      // if ((await this.redisClient.get(id)) === null) {
      const results = await Appointment.findOne({
        order: [["createdAt", "DESC"]],
        where: {
          patientID: id,
        },
        include: [
          {
            model: AppointmentAgenda,
            attributes: ["agendaDescription"],
          },
          {
            model: AppointmentStatus,
            attributes: ["statusDescription"],
          },
          {
            model: User,
            attributes: ["firstName", "middleName"],
          },
          {
            model: Patient,
            attributes: ["firstName", "middleName"],
          },
          // {
          //   model: PatientVisits,
          //   attributes: ["createdAt"],
          // },
        ],
      });

      return results;
    } catch (error) {
      console.log(error);
    }
  }
}
