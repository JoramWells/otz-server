import { DisclosureEligibilityController } from "../../../adapters/controllers/controllers/treatementplan/partial/disclosureEligibility.controller";


const express = require('express');

const router = express.Router();



const controllers = new DisclosureEligibilityController();


router.post('/add', controllers.create);
router.get('/fetchAll', controllers.find);
router.get('/detail/:id', controllers.findById);
router.get('/by-patient-id/:id', controllers.findByPatientId);
router.get('/by-visit-id/:id', controllers.findByVisitId);
router.get('/details/:id', controllers.findAllByVisitId);
// router.put('/edit/:id', editTimeAndWork);

export { router as disclosureEligibilityRouter };
