import { DisclosureTrackerController } from "../../adapters/controllers/treatementplan/disclosureTrackerController";
import { DisclosureTrackerRepository } from "../../adapters/repositories/treatmentplan/disclosureTrackerRepository";
import { DisclosureTrackerInteractor } from "../../application/interactors/treatmentplan/disclosureTrackerInteractor";

const express = require('express');

const router = express.Router();

const repository = new DisclosureTrackerRepository();
const interactor = new DisclosureTrackerInteractor(repository);

const controllers = new DisclosureTrackerController(interactor);


router.post('/add', controllers.onCreateDisclosureTracker.bind(controllers));
router.get(
  "/fetch-all-full",
  controllers.onGetAllFullDisclosureTracker.bind(controllers)
);
router.get(
  "/fetch-all-partial",
  controllers.onGetAllPartialDisclosureTracker.bind(controllers)
);
router.get('/detail/:id', controllers.onGetDisclosureTrackerById.bind(controllers));
router.get(
  "/fetch-by-full-status",
  controllers.onGroupByFullStatus.bind(controllers)
);
router.get(
  "/fetch-by-partial-status",
  controllers.onGroupByPartialStatus.bind(controllers)
);

// router.put('/edit/:id', editTimeAndWork);

export { router as disclosureTrackerRouter };
