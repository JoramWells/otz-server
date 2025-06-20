import { FollowUpChecklist } from '../../../domain/models/treatmentplan/followupChecklist.model';
import { Request, Response, NextFunction } from 'express';

export class FollowUpChecklistController {


  async create(
         req: Request,
        res: Response,
        next: NextFunction
  ) {
    const results = await FollowUpChecklist.create(req.body);

    res.json (results);
  }

  async find(       req: Request,
        res: Response,
        next: NextFunction) {
 
      const results = await FollowUpChecklist.findAll({});

    res.json (results);
  }

  async findById(       req: Request,
        res: Response,
        next: NextFunction) {
    const { id } = req.params;
      const results: FollowUpChecklist | null = await FollowUpChecklist.findOne({
        where: {
          patientVisitID: id,
        },
      });

  

    res.json (results);
  }
}
