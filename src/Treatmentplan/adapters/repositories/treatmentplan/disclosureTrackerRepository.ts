import {
  DisclosureTrackerInterface,
  PaginatedResponseInterface,
} from "otz-types";
import { IDisclosureTrackerRepository } from "../../../application/interfaces/disclosure/IDisclosureTrackerRepository";
import { RedisAdapter } from "../redisAdapter";
import { DisclosureTracker } from "../../../domain/models/treatmentplan/disclosure/disclosureTracker.model";
import { calculateLimitAndOffset } from "../../../utils/calculateLimitAndOffset";
import { Patient } from "../../../domain/models/patients.models";
import { col, fn, literal, Op, WhereOptions } from "sequelize";
import { validate as isUUID } from "uuid";
import { PartialDisclosure } from "../../../domain/models/treatmentplan/disclosure/partialDisclosure.model";
import { FullDisclosure } from "../../../domain/models/treatmentplan/disclosure/full/fullDisclosure.model";

// import { createClient } from 'redis'

export class DisclosureTrackerRepository implements IDisclosureTrackerRepository {
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
            attributes: ["id", "firstName", "middleName"],
            where,
          },
          {
            model: PartialDisclosure,
            attributes: ["score", "createdAt"],
          },
          {
            model: FullDisclosure,
            attributes: ["score", "createdAt"],
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

  //
  async findUsersByFullStatus(
    hospitalID?: string
  ): Promise<DisclosureTrackerInterface[] | null | undefined> {
    try {
      let where = {};

      //
      if (isUUID(hospitalID)) {
        where = {
          ...where,
          hospitalID,
        };
      }

      //
      const results = await DisclosureTracker.findAll({
        attributes: [
          [fn("COALESCE", col("FullDisclosure.score"), null), "score"],
          [
            literal(`
              CASE
              WHEN "fullDisclosureID" IS NULL THEN 'Not Began'
              WHEN "FullDisclosure"."score" < 22 THEN 'In Progress'
              WHEN "FullDisclosure"."score" = 22 THEN 'Completed'
              ELSE 'Completed'
              END
              `),
            "status",
          ],
          [fn("COUNT", "*"), "count"],
        ],
        include: [
          {
            model: Patient,
            attributes: [],
            where: {
              hospitalID,
            },
          },
          {
            model: FullDisclosure,
            attributes: [],
          },
        ],
        group: ["status", "DisclosureTracker.fullDisclosureID", "score"],
      });

      return results;
    } catch (error) {
      console.log(error);
    }
  }

  //
  async findUsersByPartialStatus(
    hospitalID?: string
  ): Promise<DisclosureTrackerInterface[] | null | undefined> {
    try {
      let where = {};

      //
      if (isUUID(hospitalID)) {
        where = {
          ...where,
          hospitalID,
        };
      }

      //
      const results = await DisclosureTracker.findAll({
        attributes: [
          [fn("COALESCE", col("PartialDisclosure.score"), null), "score"],
          [
            literal(`
              CASE
              WHEN "partialDisclosureID" IS NULL THEN 'Not Began'
              WHEN "PartialDisclosure"."score" < 13 THEN 'In Progress'
              WHEN "PartialDisclosure"."score" = 13 THEN 'Completed'
              ELSE 'Unknown'
              END
              `),
            "status",
          ],
          [fn("COUNT", "*"), "count"],
        ],
        include: [
          {
            model: Patient,
            attributes: [],
            where: {
              hospitalID,
            },
          },
          {
            model: PartialDisclosure,
            attributes: [],
          },
        ],
        group: ["status", "DisclosureTracker.partialDisclosureID", "score"],
      });

      return results;
    } catch (error) {
      console.log(error);
    }
  }
  
}
