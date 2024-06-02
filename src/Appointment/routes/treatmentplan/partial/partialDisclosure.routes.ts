import { PartialDisclosureController } from "../../../adapters/controllers/treatementplan/partial/partialDisclosureController";
import { PartialDisclosureRepository } from "../../../adapters/repositories/treatmentplan/partial/partialDisclosureRepository";
import { PartialDisclosureInteractor } from "../../../application/interactors/treatmentplan/partial/partialDisclosureInteractor";


const express = require('express');

const router = express.Router();

const repository = new PartialDisclosureRepository();
const interactor = new PartialDisclosureInteractor(repository);

const controllers = new PartialDisclosureController(interactor);


router.post('/add', controllers.onCreatePartialDisclosure.bind(controllers));
router.get('/fetchAll', controllers.onGetAllPartialDisclosure.bind(controllers));
router.get('/detail/:id', controllers.onGetPartialDisclosureById.bind(controllers));
router.get('/details/:id', controllers.onGetAllPartialDisclosureByVisitId.bind(controllers));
// router.put('/edit/:id', editTimeAndWork);

export { router as partialDisclosureRouter };
