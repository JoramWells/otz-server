/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type NextFunction, type Request, type Response } from "express";
import { IPostDisclosureInteractor } from "../../../../application/interfaces/disclosure/full/IPostDisclosureInteractor";
import { PostDisclosureEntity } from "../../../../domain/entities/treatmentplan/disclosure/full/PostDisclosureEntity";
import { ExecuteDisclosureEntity } from "../../../../domain/entities/treatmentplan/disclosure/full/ExecuteDisclosureEntity";


export class PostDisclosureController {
  private readonly interactor: IPostDisclosureInteractor;

  constructor(interactor: IPostDisclosureInteractor) {
    this.interactor = interactor;
  }

  async onCreatePostDisclosure(req: Request, res: Response, next: NextFunction) {
    try {
          const {
            isAssessedChildCaregiverComfort,
            isAssessedDepthOfChildKnowledge,
            isAssessedEnvironmentAndTiming,
            isConcludedSessionReassured,
            isExplainedCareOptions,
            isInvitedChildQuestions,
            isObservedImmediateReactions,
            isReassuredCaregiver,
            finalComments,
            isAddressedNegativeSelfImage,
            isAssessedChildEngagement,
            isAssessedFunctionalSchoolEngagement,
            isAssessedMoodiness,
            isAssessedPeerRelationshipAssessed,
            isChildQuestionsAllowed,
            isGivenAppropriateInfo,
            isReferredForPsychiatric,
            patientID,
            patientVisitID,
            taskFourComments,
          } = req.body;

          const readinessData: ExecuteDisclosureEntity = {
            isAssessedChildCaregiverComfort,
            isAssessedDepthOfChildKnowledge,
            isAssessedEnvironmentAndTiming,
            isConcludedSessionReassured,
            isExplainedCareOptions,
            isInvitedChildQuestions,
            isObservedImmediateReactions,
            isReassuredCaregiver,
          };

          const disclosureData: PostDisclosureEntity = {
          finalComments,
          isAddressedNegativeSelfImage,
          isAssessedChildEngagement,
          isAssessedFunctionalSchoolEngagement,
          isAssessedMoodiness,
          isAssessedPeerRelationshipAssessed,
          isChildQuestionsAllowed,
          isGivenAppropriateInfo,
          isReferredForPsychiatric,
          patientID,
          patientVisitID,
          taskFourComments
          };

      console.log(req.body);
      const newProfile = await this.interactor.createPostDisclosure(disclosureData,readinessData);
      res.json(newProfile);
      //   logger.info({
      //     message: "Created New Patient Successfully! ~" + req.body.firstName,
      //   });
      next();
    } catch (error) {
      console.log(error)

      next(error);
    }
  }

  async onGetAllPostDisclosure(req: Request, res: Response, next: NextFunction) {
    try {
      // const redisClient = createClient({ url: 'redis://redis:6379' })
      // await redisClient.connect()

      const results = await this.interactor.getAllPostDisclosure();
      res.status(200).json(results);

      next();
    } catch (error) {
      next(error);
      res.status(500).json({ message: "Internal Server Error" });
      // console.log(error)
    }
  }

  async onGetPostDisclosureById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getPostDisclosureById(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" }); 
    }
  }

  // 

  async onGetAllPostDisclosureByVisitId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this.interactor.getAllPostDisclosureByVisitId(id);
      res.status(200).json(result);
      next();
    } catch (error) {
      next(error);
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
