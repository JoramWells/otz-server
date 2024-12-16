import { DisclosureTrackerController } from "../../adapters/controllers/treatementplan/disclosureTrackerController";
import { DisclosureTrackerRepository } from "../../adapters/repositories/treatmentplan/disclosureTrackerRepository";
import { DisclosureTrackerInteractor } from "../../application/interactors/treatmentplan/disclosureTrackerInteractor";

const express = require('express');

const router = express.Router();

const repository = new DisclosureTrackerRepository();
const interactor = new DisclosureTrackerInteractor(repository);

const controllers = new DisclosureTrackerController(interactor);


router.post('/add', controllers.onCreateDisclosureTracker.bind(controllers));
router.get('/fetchAll', controllers.onGetAllDisclosureTracker.bind(controllers));
router.get('/detail/:id', controllers.onGetDisclosureTrackerById.bind(controllers));
// router.put('/edit/:id', editTimeAndWork);

export { router as disclosureTrackerRouter };
