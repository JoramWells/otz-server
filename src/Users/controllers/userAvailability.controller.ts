/* eslint-disable @typescript-eslint/no-var-requires */

import { UserAvailabilityAttributes } from 'otz-types'
import { UserAvailability } from '../domain/models/userAvailability.model'
import { Request, Response } from "express";

export class UserAvailabilityController{
  async create (req: Request,res:Response): Promise<UserAvailabilityAttributes> {
    const results = await UserAvailability.create(req.body)

    return results
  }

  async find (req: Request,res:Response){
    const results = await UserAvailability.findAll({})
    res.json (results)
  }

  async findById (req: Request,res:Response) {
    const {id} = req.params
    const results = await UserAvailability.findOne({
      where: {
        userID: id
      }
    }
    )
    res.json (results)
  }

    async edit(req: Request,res:Response) {
    const { id, availability } = req.body;


    const results = await UserAvailability.findOne({
      where: {
        id,
      },
    });

    if (results) {
      results.availability = availability as any;

      await results.save();
    }
    res.json (results);
  }

}
