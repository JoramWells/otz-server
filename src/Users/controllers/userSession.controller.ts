/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { UserSessionLogInterface } from 'otz-types'
import { connect } from '../domain/db/connect'
import { logger } from '../utils/logger'
// import { createClient } from 'redis'
import { UserSessionLog } from '../domain/models/userSession'
import { Request, Response } from "express";


export class UserSessionLogController {
  // constructor () {
  //   this.redisClient = createClient({})
  // }


  async create(
   req: Request,res:Response
  ){
    // const { firstName, middleName, lastName, dob, phoneNo, cccNo, occupationID, sex, hospitalID, schoolID, idNo } = data
    let results = "";
    await connect
      .transaction(async (t) => {
        const results = await UserSessionLog.create(req.body, { transaction: t });


      })
      .then(() => {
        results = "Successfully registered a New Patient";
      });

    // const patientUserSessionLogInterface: UserSessionLogInterface = {
    //   id: results.id,
    //   firstName: results.firstName,
    //   middleName,
    //   sex,
    //   occupationID,
    //   phoneNo,
    //   idNo
    // }

    res.json (results);
  }


  async find(req: Request,res:Response) {

      const results = await UserSessionLog.findAll({

      });
      logger.info({ message: "Fetched from db!" });

      res.json (results);

  }

  async findById( req: Request,res:Response): Promise<UserSessionLogInterface[] | null> {
const {id} = req.params
    const results= await UserSessionLog.findAll({
      where: {
        userID:id,
      },
    });
    if (results === null) {
      console.log(results, "resultx");
    }
    console.log(results, "founde");

    return results;
  }


  async edit(req: Request,res:Response): Promise<UserSessionLogInterface | null> {
    const { id } = req.body;

    // delete cache
    // await this.redisClient.del(patientCache);
    // await this.redisClient.del(id as string);

    const results = await UserSessionLog.findOne({
      where: {
        id,
      },
    });


    return results;
  }

  //

  //
  async delete(req: Request,res:Response): Promise<number | null> {
    const {id} = req.params
    // await this.redisClient.del(patientCache);
    // await this.redisClient.del(id as string);
    const results: number | null = await UserSessionLog.destroy({
      where: {
        id,
      },
    });
    console.log("deleted cache!!");

    return results;
  }
}
