/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'

import { IVitalSignsRepository } from "../../../application/interfaces/lab/IVitalSignsRepository";
import { VitalSigns } from "../../../domain/models/lab/vitalSigns.model";
import { VitalSignsInterface } from "otz-types";
import { VitalSignResponseInterface } from "../../../entities/VitalSignResponseInterface";
import { Patient } from "../../../domain/models/patients.models";
import { Op } from "sequelize";

export class VitalSignsRepository implements IVitalSignsRepository {
  async create(data: VitalSignsInterface): Promise<VitalSignsInterface> {
    try {
      const results: VitalSignsInterface = await VitalSigns.create(data);

      return results;
    } catch (error) {
      console.log(error);
    }
  }

  async find(
    hospitalID: string,
    page: number,
    pageSize: number,
    searchQuery: string
  ): Promise<VitalSignResponseInterface | null | undefined> {
    try {
      const currentDate = new Date();
      let maxDate = new Date(
        currentDate.getFullYear() - 24,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      let where = {
        hospitalID,
        dob: { [Op.gte]: maxDate }, // Default filter
      };

      //
      // Add search query filter if provided
      if (searchQuery) {
        where = {
          ...where,
          [Op.or]: [
            { firstName: { [Op.iLike]: `%${searchQuery}%` } },
            { middleName: { [Op.iLike]: `%${searchQuery}%` } },
            { cccNo: { [Op.iLike]: `%${searchQuery}%` } },
          ],
        };
      }

      const offset = (page - 1) * pageSize;
      const limit = pageSize;

      const { rows, count } = await VitalSigns.findAndCountAll({
        limit,
        offset,
        include: [
          {
            model: Patient,
            where,
          },
        ],
      });
      return {
        data: rows,
        total: count,
        page: 1,
        pageSize: 10,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id: string): Promise<VitalSignsInterface | null | undefined> {
    try {
      const results = await VitalSigns.findOne({
        order: [["createdAt", "DESC"]],
        where: {
          id,
        },
      });

      return results;
    } catch (error) {
      console.log(error);
    }
  }

  //
  async findByVisitId(
    id: string
  ): Promise<VitalSignsInterface | null | undefined> {
    try {
      const results = await VitalSigns.findOne({
        order: [["createdAt", "DESC"]],
        where: {
          patientVisitID: id,
        },
      });

      return results;
    } catch (error) {
      console.log(error);
    }
  }

  //
  async findByPatientId(
    id: string
  ): Promise<VitalSignsInterface | null | undefined> {
    try {
      const results = await VitalSigns.findOne({
        order: [["createdAt", "DESC"]],
        where: {
          patientID: id,
        },
      });

      return results;
    } catch (error) {
      console.log(error);
    }
  }
}