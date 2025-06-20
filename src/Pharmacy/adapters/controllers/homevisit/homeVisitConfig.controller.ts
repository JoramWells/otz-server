import {
  HomeVisitConfigAttributes,
} from "otz-types";
import { KafkaAdapter } from "../../kafka/producer/kafka.producer";
import { connect } from "../../../domain/db/connect";
import { Patient } from "../../../domain/models/patients.models";
import { User } from "../../../domain/models/user.model";
import { HomeVisitReason } from "../../../domain/models/homevisit/homeVisitReason.model";
import { HomeVisitFrequency } from "../../../domain/models/homevisit/homeVisitFrequency.model";
import { ART } from "../../../domain/models/art/art.model";
import { HomeVisitConfig } from "../../../domain/models/homevisit/homeVisitConfig.model";
import { PatientVisits } from "../../../domain/models/patientVisits.model";
import { Op, WhereOptions } from "sequelize";
import { validate as isUUID } from "uuid";
import {
  calculateLimitAndOffset,
  calculateMaxAge,
} from "../../../utils/calculateLimitAndOffset";
import { Request, Response, NextFunction } from 'express';


export class HomeVisitConfigController {
  private readonly kafkaProducer = new KafkaAdapter();

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<HomeVisitConfigAttributes> {
    //

    return await connect.transaction(async (t) => {

      return await HomeVisitConfig.create(req.body, { transaction: t });
  
    });


  }

  async find(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const {hospitalID,page,pageSize,searchQuery} = req.body;
    try {
      const maxDate = calculateMaxAge(25);
      const { limit, offset } = calculateLimitAndOffset(page, pageSize);

      let where: WhereOptions = {
        dob: {
          [Op.gte]: maxDate,
        },
      };

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
      const { rows, count } = await HomeVisitConfig.findAndCountAll({
        limit,
        offset,
        include: [
          {
            model: PatientVisits,
            attributes: ["id"],
            include: [
              {
                model: Patient,
                attributes: [
                  "id",
                  "firstName",
                  "middleName",
                  "lastName",
                  "isImportant",
                  "dob",
                  "sex"
                ],
                where,
                required: true
              },
              {
                model: User,
                attributes: ["firstName", "middleName", "lastName"],
              },
            ],
          },
          {
            model: HomeVisitReason,
            attributes: ["homeVisitReasonDescription"],
          },
        ],
      });

      // await Promise.all(
      //   results.map(async(config)=>{
      //     const user = await config.getUser()
      //     console.log(user)
      //   })
      // )

      res.json ({
        data: rows,
        total: count,
        page: page,
        pageSize: limit,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findById(req: Request,
    res: Response,
    next: NextFunction){
        const {id} = req.params;
    const results = await HomeVisitConfig.findOne({
      order: [["createdAt", "DESC"]],
      where: {
        id,
      },
      include: [
        {
          model: HomeVisitReason,
          attributes: ["id", "homeVisitReasonDescription"],
        },
        {
          model: PatientVisits,
          attributes: ["id"],
          include: [
            {
              model: Patient,
              attributes: [
                "id",
                "firstName",
                "middleName",
                "lastName",
                "isImportant",
                "dob",
                "sex",
              ],
            },
            {
              model: User,
              attributes: ["firstName", "middleName", "lastName"],
            },
          ],
        },
      ],
    });

    res.json (results);
  }

  async findAllById(req: Request,
    res: Response,
    next: NextFunction) {
        const {id} = req.params;
    
    const results = await HomeVisitConfig.findAll({
      where: {
        id,
      },
      include: [
        {
          model: User,
          attributes: ["firstName", "middleName", "lastName"],
        },
        {
          model: ART,
          attributes: ["artName"],
        },
        {
          model: HomeVisitReason,
          attributes: ["id", "homeVisitReasonDescription"],
        },
        {
          model: HomeVisitFrequency,
          attributes: ["id", "homeVisitFrequencyDescription"],
        },
      ],
    });
    res.json (results);
  }
}
