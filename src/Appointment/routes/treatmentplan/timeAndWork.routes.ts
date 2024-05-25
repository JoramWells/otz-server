import { TimeAndWorkController } from "../../adapters/controllers/treatementplan/timeAndWorkController";
import { TimeAndWorkRepository } from "../../adapters/repositories/treatmentplan/timeAndWorkRepository";
import { TimeAndWorkInteractor } from "../../application/interactors/treatmentplan/timeAndWorkInteractor";

const express = require('express');

const router = express.Router();

const repository = new TimeAndWorkRepository();
const interactor = new TimeAndWorkInteractor(repository);

const controllers = new TimeAndWorkController(interactor);


router.post('/add', controllers.onCreateTimeAndWork.bind(controllers));
router.get('/fetchAll', controllers.onGetAllTimeAndWork.bind(controllers));
router.get('/detail/:id', controllers.onGetTimeAndWorkById.bind(controllers));
router.get("/patient-detail/:id", controllers.onGetTimeAndWorkByPatientId.bind(controllers));
// router.put('/edit/:id', editTimeAndWork);
router.put('/update-morning-schedule/:id', controllers.updateMorningSchedule.bind(controllers));
router.put('/update-evening-schedule/:id', controllers.updateEveningSchedule.bind(controllers));
// router.delete('/delete/:id', deleteTimeAndWork);

export {router as timeAndWorkRouter}
