/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from 'express'
import { ITransferOutInteractor } from '../../../application/interfaces/transfer/ITransferOutInteractor';
// import { createClient } from 'redis'
// import { Patient } from '../../domain/entities/Patient'
export class TransferOutController {
  private readonly interactor: ITransferOutInteractor;

  constructor(interactor: ITransferOutInteractor) {
    this.interactor = interactor;
  }

  async onCreateTransferOut(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const newProfile = await this.interactor.createTransferOut(req.body);
      res.json(newProfile);
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async onGetAllTransferOuts(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()
      const { hospitalID } = req.query;

      const results = await this.interactor.getAllTransferOuts(hospitalID);
      res.status(200).json(results);
      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }

  async onGetTransferOutByHospitalId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { hospitalID } = req.query;
      const result = await this.interactor.getTransferOutByHospitalId(hospitalID);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

