/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IMMASEightInteractor } from "../../../application/interfaces/treatmentplan/IMMAS8Interactor";
import { MMASEightAttributes, MMASFourAttributes } from "otz-types";

export class MMASEightController {
  private readonly interactor: IMMASEightInteractor;

  constructor(interactor: IMMASEightInteractor) {
    this.interactor = interactor;
  }

  async onCreateMMASEight(req: Request, res: Response, next: NextFunction) {
    const {
      isCareless,
      isForget,
      isQuitFeelBetter,
      isQuitFeelWorse,
      patientID,
      patientVisitID,
      mmassFourScore,
      mmassEightScore,
      difficultyRemembering,
      isQuitOutControl,
      isTookMedYesterday,
      isUnderPressure,
    } = req.body;
    const data4: MMASFourAttributes = {
      isCareless,
      isForget,
      isQuitFeelBetter,
      isQuitFeelWorse,
      patientID,
      patientVisitID,
      totalScores: mmassFourScore,
    };

    const data8: MMASEightAttributes = {
      difficultyRemembering,
      isQuitOutControl,
      isTookMedYesterday,
      isUnderPressure,
      patientVisitID,
      patientID,
      totalScores: mmassEightScore,
    };

    try {
      console.log(req.body);
      const newProfile = await this.interactor.createMMASEight(data4, data8);
      res.json(newProfile);
      //   logger.info({
      //     message: "Created New Patient Successfully! ~" + req.body.firstName,
      //   });
      next();
    } catch (error) {
      // console.log(error)

      next(error);
    }
  }

  async onGetAllMMASEight(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllMMASEight();
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      // console.log(error)
    }
  }

  async onGetMMASEightById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getMMASEightById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  async onGetMMASEightByPatientId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getMMASEightByPatientId(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
