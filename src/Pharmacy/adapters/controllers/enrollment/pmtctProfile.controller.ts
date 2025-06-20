
import { PMTCTProfileInterface } from "otz-types";
import { PMTCTProfile } from "../../../domain/models/enrollment/pmtct/pmtctProfile.model";
import { Patient } from "../../../domain/models/patients.models";
import { Request, Response, NextFunction } from 'express';

export class PMTCTProfileController {
  async create(req: Request,
    res: Response,
    next: NextFunction): Promise<PMTCTProfileInterface> {
    const results: PMTCTProfileInterface = await PMTCTProfile.create(req.body);
    res.json (results);
  }

  async find(req: Request,
    res: Response,
    next: NextFunction){
    const results = await PMTCTProfile.findAll({
      include: [
        {
          model: Patient,
          attributes: ["firstName", "middleName", "dob"],
        },
      ],
    });
    res.json (results);
  }

  async findById(req: Request,
    res: Response,
    next: NextFunction): Promise<PMTCTProfileInterface | null> {
        const { id } = req.params;
    const results = await PMTCTProfile.findOne({
      where: {
        id,
      },
    });

    res.json (results);
  }
}
