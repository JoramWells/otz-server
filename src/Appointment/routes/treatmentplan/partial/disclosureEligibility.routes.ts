import { DisclosureEligibilityController } from "../../../adapters/controllers/treatementplan/partial/disclosureEligibilityController";
import { DisclosureEligibilityRepository } from "../../../adapters/repositories/treatmentplan/partial/disclosureEligibilityRepository";
import { DisclosureEligibilityInteractor } from "../../../application/interactors/treatmentplan/partial/disclosureEligibilityInteractor";



const express = require('express');

const router = express.Router();

const repository = new DisclosureEligibilityRepository();
const interactor = new DisclosureEligibilityInteractor(repository);

const controllers = new DisclosureEligibilityController(interactor);


router.post('/add', controllers.onCreateDisclosureEligibility.bind(controllers));
router.get('/fetchAll', controllers.onGetAllDisclosureEligibility.bind(controllers));
router.get('/detail/:id', controllers.onGetDisclosureEligibilityById.bind(controllers));
router.get('/by-patient-id/:id', controllers.onGetDisclosureEligibilityByPatientId.bind(controllers));
router.get('/details/:id', controllers.onGetAllDisclosureEligibilityByVisitId.bind(controllers));
// router.put('/edit/:id', editTimeAndWork);

export { router as disclosureEligibilityRouter };
