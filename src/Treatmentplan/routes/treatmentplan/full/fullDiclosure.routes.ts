import { FullDisclosureController } from "../../../adapters/controllers/treatementplan/full/fullDisclosureController";
import { FullDisclosureRepository } from "../../../adapters/repositories/treatmentplan/full/fullDisclosureRepository";
import { FullDisclosureInteractor } from "../../../application/interactors/treatmentplan/full/fullDisclosureInteractor";

const express = require("express");

const router = express.Router();

const repository = new FullDisclosureRepository()
const interactor = new FullDisclosureInteractor(repository);

const controllers = new FullDisclosureController(interactor);

router.post(
  "/add",
  controllers.onCreateFullDisclosure.bind(controllers)
);
router.get(
  "/fetchAll",
  controllers.onGetAllFullDisclosure.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetFullDisclosureById.bind(controllers)
);

// 
router.get(
  "/by-patient-id/:id",
  controllers.onGetFullDisclosureByPatientId.bind(controllers)
);
// 
router.get(
  "/by-visit-id/:id",
  controllers.onGetAllFullDisclosureByVisitId.bind(controllers)
);
router.get(
  "/score",
  controllers.onGetFullDisclosureCategoryScore.bind(controllers)
);
// router.put('/edit/:id', editTimeAndWork);

router.get("/fetchAll", controllers.onGetAllFullDisclosure.bind(controllers));

export { router as fullDisclosureRouter };
