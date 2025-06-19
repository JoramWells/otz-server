/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
import { patientCache } from '../constants'
import { connect } from '../domain/db/connect'
import { logger } from '../utils/logger'
// import { createClient } from 'redis'
import { PatientSessionLogInterface } from 'otz-types'
import { PatientSessionLog } from '../domain/models/patientSessionLog.model'
import { Request, Response, NextFunction } from "express";

export class PatientSessionLogController  {

  async create(
   req: Request, res: Response,
  ): Promise<string | null> {
    let results = "";
    await connect
      .transaction(async (t) => {
        const results = await PatientSessionLog.create(req.body, { transaction: t });


      })
      .then(() => {
        results = "Successfully registered a New Patient";
      });


    return results;
  }


  async find(req: Request, res: Response) {
    
      const results = await PatientSessionLog.findAll({

      });
      logger.info({ message: "Fetched from db!" });
      console.log("fetched from db!");
      // set to cace

      res.json (results);
    }

  async findById(req: Request, res: Response){
    const { id } = req.params;

    const results: PatientSessionLogInterface[] | null = await PatientSessionLog.findAll({
      where: {
        patientID:id,
      },
    });
    if (results === null) {
      console.log(results, "resultx");
    }
    console.log(results, "founde");

    res.json (results);
  }


  async edit(req: Request, res: Response){
    const { id } = req.params;

    const results = await PatientSessionLog.findOne({
      where: {
        id,
      },
    });


    res.json (results);
  }

  //

  //
  async delete(req: Request, res: Response): Promise<number | null> {
  
    const {id} = req.params
    const results: number | null = await PatientSessionLog.destroy({
      where: {
        id,
      },
    });
    console.log("deleted cache!!");

    return results;
  }
}
