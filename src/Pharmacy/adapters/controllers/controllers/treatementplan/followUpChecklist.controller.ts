// import { IPatientInteractor } from '../../application/interfaces/IPatientInteractor'
// import { logger } from '../../utils/logger'
import { FollowUpChecklistAttributes } from 'otz-types';
import { FollowUpChecklist } from '../../../domain/models/treatmentplan/followupChecklist.model';
// import { mmasCache } from '../../../constants/appointmentCache';
import { Request, Response, NextFunction } from 'express';

export class FollowUpChecklistController {


  async create(
         req: Request,
        res: Response,
        next: NextFunction
  ): Promise<FollowUpChecklistAttributes> {
    const results = await FollowUpChecklist.create(data);

    res.json (results);
  }

  async find(       req: Request,
        res: Response,
        next: NextFunction) {
    // await this.redisClient.connect();
    // check if patient
    // if ((await this.redisClient.get(mmasCache)) === null) {
      const results = await FollowUpChecklist.findAll({});

    res.json (results);
  }

  async findById(       req: Request,
        res: Response,
        next: NextFunction): Promise<FollowUpChecklistAttributes | null> {
    const { id } = req.params;
      const results: FollowUpChecklist | null = await FollowUpChecklist.findOne({
        where: {
          patientVisitID: id,
        },
      });

  

    res.json (results);
  }
}
