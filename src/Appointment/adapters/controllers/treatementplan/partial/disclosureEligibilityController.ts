/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IDisclosureEligibilityInteractor } from "../../../../application/interfaces/disclosure/partial/IDisclosureEligibilityInteractor";
import { ChildCaregiverReadinessAttributes, ChildDisclosureEligibilityAttributes } from "otz-types";

export class DisclosureEligibilityController {
  private readonly interactor: IDisclosureEligibilityInteractor;

  constructor(interactor: IDisclosureEligibilityInteractor) {
    this.interactor = interactor;
  }

  async onCreateDisclosureEligibility(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {
        isAssessedCaregiverReadinessToDisclose,
        isCaregiverCommunicatedToChild,
        isChildKnowsMedicineAndIllness,
        isChildSchoolEngagement,
        isConsistentSocialSupport,
        isFreeChildCaregiverFromSevereIllness,
        isInterestInEnvironmentAndPlaying,
        isSecuredPatientInfo,
        patientID,
        patientVisitID,
        taskTwoComments,
        isCorrectAge,
        isKnowledgeable,
        isWillingToDisclose,
        taskOneComments,
      } = req.body;

      const readinessData: ChildCaregiverReadinessAttributes = {
        isAssessedCaregiverReadinessToDisclose,
        isCaregiverCommunicatedToChild,
        isChildKnowsMedicineAndIllness,
        isChildSchoolEngagement,
        isConsistentSocialSupport,
        isFreeChildCaregiverFromSevereIllness,
        isInterestInEnvironmentAndPlaying,
        isSecuredPatientInfo,
        patientID,
        patientVisitID,
        taskTwoComments,
      };

      const disclosureData: ChildDisclosureEligibilityAttributes = {
        isCorrectAge,
        isKnowledgeable,
        isWillingToDisclose,
        patientID,
        patientVisitID,
        taskOneComments,
      };

      console.log(req.body);
      const newProfile = await this.interactor.createDisclosureEligibility(
        disclosureData,
        readinessData
      );
      res.json(newProfile);
      //   logger.info({
      //     message: "Created New Patient Successfully! ~" + req.body.firstName,
      //   });
      next();
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  async onGetAllDisclosureEligibility(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllDisclosureEligibility();
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      // console.log(error)
    }
  }

  async onGetDisclosureEligibilityById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getDisclosureEligibilityById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //
  async onGetDisclosureEligibilityByPatientId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getDisclosureEligibilityByPatientId(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //

  async onGetAllDisclosureEligibilityByVisitId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getAllDisclosureEligibilityByVisitId(
        id
      );
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
