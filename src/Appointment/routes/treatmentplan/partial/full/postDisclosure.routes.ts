import { PostDisclosureController } from "../../../../adapters/controllers/treatementplan/full/postDisclosureController";
import { PostDisclosureRepository } from "../../../../adapters/repositories/treatmentplan/full/postDisclosureRepository";
import { PostDisclosureInteractor } from "../../../../application/interactors/treatmentplan/full/postDisclosureInteractor";

const express = require("express");

const router = express.Router();

const repository = new PostDisclosureRepository()
const interactor = new PostDisclosureInteractor(repository);

const controllers = new PostDisclosureController(interactor);

router.post(
  "/add",
  controllers.onCreatePostDisclosure.bind(controllers)
);
router.get(
  "/fetchAll",
  controllers.onGetAllPostDisclosure.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetPostDisclosureById.bind(controllers)
);

// 
router.get(
  "/by-patient-id/:id",
  controllers.onGetPostDisclosureByPatientId.bind(controllers)
);
router.get(
  "/details/:id",
  controllers.onGetAllPostDisclosureByVisitId.bind(controllers)
);
// router.put('/edit/:id', editTimeAndWork);

export { router as postDisclosureRouter };
