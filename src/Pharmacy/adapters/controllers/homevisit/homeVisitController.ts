/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IHomeVisitInteractor } from "../../../application/interfaces/homevisit/IHomeVisitInteractor";
import { AppointmentAttributes, HomeVisitAttributes } from "otz-types";

export class HomeVisitController {
  private readonly interactor: IHomeVisitInteractor;

  constructor(interactor: IHomeVisitInteractor) {
    this.interactor = interactor;
  }

  async onCreateAHomeVisit(req: Request, res: Response, next: NextFunction) {
    console.log(req.body);
    try {
      const {
        userID,
        patientID,
        artPrescription,
        tbPrescription,
        homeVisitConfigID,
        frequency,
        ol_drugs,
        noOfPills,
        medicineStatus,
        actionTaken,
        returnToClinic,
        isPillsCounted,
        isClinicVisits,
        isDisclosure,
        isGuardianSupport,
        isSupportGroupAttendance,
        isHouseholdTested,
        appointmentAgendaID,
        appointmentStatusID,
        patientVisitID,
        appointmentDate,
      } = req.body;

      const appointmentInput: AppointmentAttributes = {
        userID,
        patientID,
        patientVisitID,
        appointmentAgendaID,
        appointmentStatusID,
        frequency,
        appointmentDate,
      };

      const homeVisitInput: HomeVisitAttributes = {
        homeVisitConfigID,

        artPrescription,
        tbPrescription,
        ol_drugs,
        noOfPills,
        medicineStatus,
        actionTaken,
        returnToClinic,
        isPillsCounted,
        isClinicVisits,
        isDisclosure,
        isGuardianSupport,
        isSupportGroupAttendance,
        isHouseholdTested,
      };

      console.log(req.body);

      const newProfile = await this.interactor.createHomeVisit(
        homeVisitInput,
        appointmentInput
      );
      res.json(newProfile);
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async onGetAllHomeVisits(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()
      let { hospitalID, page, pageSize, searchQuery } = req.query;

      const results = await this.interactor.getAllHomeVisits(
        hospitalID as string,
        page as string,
        pageSize as string,
        searchQuery as string
      );
      res.status(200).json(results);
      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      console.log(error);
    }
  }

  async onGetAHomeVisitById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getHomeVisitById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  async onGetAllHomeVisitById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getAllHomeVisitById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
