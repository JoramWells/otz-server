import {
  DisclosureTrackerInterface,
  PaginatedResponseInterface,
} from "otz-types";
import { IDisclosureTrackerRepository } from "../../../application/interfaces/disclosure/IDisclosureTrackerRepository";
import { RedisAdapter } from "../redisAdapter";
import { DisclosureTracker } from "../../../domain/models/treatmentplan/disclosure/disclosureTracker.model";
import { calculateLimitAndOffset } from "../../../utils/calculateLimitAndOffset";
import { Patient } from "../../../domain/models/patients.models";
import { Op, WhereOptions } from "sequelize";
import { validate as isUUID } from "uuid";
import { PartialDisclosure } from "../../../domain/models/treatmentplan/disclosure/partialDisclosure.model";
import { FullDisclosure } from "../../../domain/models/treatmentplan/disclosure/full/fullDisclosure.model";

// import { createClient } from 'redis'

export class DisclosureTrackerRepository
  implements IDisclosureTrackerRepository
{
  private readonly redisClient = new RedisAdapter();
  // constructor () {
  //   this.redisClient = createClient({})
  // }

  async create(
    data: DisclosureTrackerInterface
  ): Promise<DisclosureTrackerInterface> {
    const results = await DisclosureTracker.create(data);

    return results;
  }

  async find(
    hospitalID?: string,
    page?: string,
    pageSize?: string,
    searchQuery?: string,
    hasFullDisclosure?: string,
    hasPartialDisclosure?: string
  ): Promise<
    PaginatedResponseInterface<DisclosureTrackerInterface> | null | undefined
  > {
    let where: WhereOptions = {};

    let fullDisclosureWhere: WhereOptions = {};
    let partialDisclosureWhere: WhereOptions = {};

    if (hasFullDisclosure === "true") {
      fullDisclosureWhere = {
        ...fullDisclosureWhere,
        fullDisclosureID: {
          [Op.ne]: null,
        },
      };
      where = {
        ...where,
        dob: {
          [Op.between]: [
            new Date().setFullYear(new Date().getFullYear() - 14),
            new Date().setFullYear(new Date().getFullYear() - 10),
          ],
        },
      };
    } else if (hasFullDisclosure === "false") {
      fullDisclosureWhere = {
        ...fullDisclosureWhere,
        fullDisclosureID: {
          [Op.is]: null,
        },
      };
      //
      where = {
        ...where,
        dob: {
          [Op.between]: [
            new Date().setFullYear(new Date().getFullYear() - 14),
            new Date().setFullYear(new Date().getFullYear() - 10),
          ],
        },
      };
    } else {
      fullDisclosureWhere = {};
    }

    //
    if (hasPartialDisclosure === "true") {
      partialDisclosureWhere = {
        ...partialDisclosureWhere,
        partialDisclosureID: {
          [Op.ne]: null,
        },
      };

      //
      where = {
        ...where,
        dob: {
          [Op.between]: [
            new Date().setFullYear(new Date().getFullYear() - 9),
            new Date().setFullYear(new Date().getFullYear() - 5),
          ],
        },
      };
    } else if (hasPartialDisclosure === "false") {
      partialDisclosureWhere = {
        ...partialDisclosureWhere,
        partialDisclosureID: {
          [Op.is]: null,
        },
      };
      where = {
        ...where,
        dob: {
          [Op.between]: [
            new Date().setFullYear(new Date().getFullYear() - 9),
            new Date().setFullYear(new Date().getFullYear() - 5),
          ],
        },
      };
    } else {
      partialDisclosureWhere = {};
    }

    try {
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

      if (isUUID(hospitalID)) {
        where = {
          ...where,
          hospitalID,
        };
      }

      const { limit, offset } = calculateLimitAndOffset(page, pageSize);
      const { rows, count } = await DisclosureTracker.findAndCountAll({
        limit,
        offset,
        // where: fullDisclosureWhere,
        where: { ...fullDisclosureWhere, ...partialDisclosureWhere },
        include: [
          {
            model: Patient,
            attributes: ["firstName", "middleName"],
            where,
          },
          {
            model: PartialDisclosure,
            attributes: ["score"],
          },
          {
            model: FullDisclosure,
            attributes: ["score"],
          },
        ],
      });

      return {
        data: rows,
        total: count,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id: string): Promise<DisclosureTrackerInterface | null> {
    // await this.redisClient.connect();
    // if ((await this.redisClient.get(id)) === null) {
    const results = await DisclosureTracker.findOne({
      where: {
        id,
      },
    });

    return results;
  }
}
