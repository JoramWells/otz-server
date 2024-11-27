import { ExecuteDisclosureController } from "../../../../adapters/controllers/treatementplan/full/executeDiclosureController";
import { ExecuteDisclosureRepository } from "../../../../adapters/repositories/treatmentplan/full/executeDisclosureRepository";
import { ExecuteDisclosureInteractor } from "../../../../application/interactors/treatmentplan/full/executeDisclosureInteractor";

const express = require("express");

const router = express.Router();

const repository = new ExecuteDisclosureRepository()
const interactor = new ExecuteDisclosureInteractor(repository);

const controllers = new ExecuteDisclosureController(interactor);

router.post(
  "/add",
  controllers.onCreateExecuteDisclosure.bind(controllers)
);
router.get(
  "/fetchAll",
  controllers.onGetAllExecuteDisclosure.bind(controllers)
);
router.get(
  "/detail/:id",
  controllers.onGetExecuteDisclosureById.bind(controllers)
);
router.get(
  "/by-patient-id/:id",
  controllers.onGetExecuteDisclosureByPatientId.bind(controllers)
);
router.get(
  "/details/:id",
  controllers.onGetAllExecuteDisclosureByVisitId.bind(controllers)
);
// router.put('/edit/:id', editTimeAndWork);

export { router as executeDisclosureRouter };
