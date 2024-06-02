import { DisclosureChecklistController } from "../../adapters/controllers/treatementplan/disclosureChecklistController";
import { DisclosureChecklistRepository } from "../../adapters/repositories/treatmentplan/disclosureChecklistRepository";
import { DisclosureChecklistInteractor } from "../../application/interactors/treatmentplan/disclosureChecklistInteractor";

const express = require('express');

const router = express.Router();

const repository = new DisclosureChecklistRepository();
const interactor = new DisclosureChecklistInteractor(repository);

const controllers = new DisclosureChecklistController(interactor);


router.post('/add', controllers.onCreateDisclosureChecklist.bind(controllers));
router.get('/fetchAll', controllers.onGetAllDisclosureChecklist.bind(controllers));
router.get('/detail/:id', controllers.onGetDisclosureChecklistById.bind(controllers));
router.get('/details/:id', controllers.onGetAllDisclosureChecklistByVisitId.bind(controllers));
// router.put('/edit/:id', editTimeAndWork);

export { router as disclosureChecklistRouter };
