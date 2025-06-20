import { ChildCaregiverReadinessController } from "../../../adapters/controllers/treatementplan/partial/childCaregiverReadiness.controller";

const express = require('express');

const router = express.Router();

const controllers = new ChildCaregiverReadinessController();


router.post('/add', controllers.create);
router.get('/fetchAll', controllers.find);
router.get('/detail/:id', controllers.findById);
router.get('/details/:id', controllers.findByVisitId);
router.get('/by-patient-id/:id', controllers.findByPatientId);
router.get('/by-visit-id/:id', controllers.findAllByVisitId);
// router.put('/edit/:id', editTimeAndWork);

export { router as childCaregiverReadinessRouter };
