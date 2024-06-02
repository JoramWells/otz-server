import { ChildCaregiverReadinessController } from "../../../adapters/controllers/treatementplan/partial/childCaregiverReadinessController";
import { ChildCaregiverReadinessRepository } from "../../../adapters/repositories/treatmentplan/partial/childCaregiverReadinessRepository";
import { ChildCaregiverReadinessInteractor } from "../../../application/interactors/treatmentplan/partial/childCaregiverReadinessInteractor";



const express = require('express');

const router = express.Router();

const repository = new ChildCaregiverReadinessRepository();
const interactor = new ChildCaregiverReadinessInteractor(repository);

const controllers = new ChildCaregiverReadinessController(interactor);


router.post('/add', controllers.onCreateChildCaregiverReadiness.bind(controllers));
router.get('/fetchAll', controllers.onGetAllChildCaregiverReadiness.bind(controllers));
router.get('/detail/:id', controllers.onGetChildCaregiverReadinessById.bind(controllers));
router.get('/details/:id', controllers.onGetAllChildCaregiverReadinessByVisitId.bind(controllers));
// router.put('/edit/:id', editTimeAndWork);

export { router as childCaregiverReadinessRouter };
