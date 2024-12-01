import { TimeAndWorkController } from "../../adapters/controllers/treatmentplan/timeAndWorkController";
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
router.get("/by-visit-id/:id", controllers.onGetTimeAndWorkByVisitId.bind(controllers));
// router.put('/edit/:id', editTimeAndWork);
router.put('/update-morning-schedule/:id', controllers.updateMorningSchedule.bind(controllers));
router.put('/update-evening-schedule/:id', controllers.updateEveningSchedule.bind(controllers));
router.put('/update-schedule/:id', controllers.onEditSchedule.bind(controllers));
router.delete('/delete/:id', controllers.onDeleteSchedule.bind(controllers))


export {router as timeAndWorkRouter}
