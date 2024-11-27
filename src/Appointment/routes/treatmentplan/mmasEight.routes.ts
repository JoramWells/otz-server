import { MMASEightController } from "../../adapters/controllers/treatementplan/mmasEightController";
import { MMASEightRepository } from "../../adapters/repositories/treatmentplan/mmas8Repository";
import { MMASEightInteractor } from "../../application/interactors/treatmentplan/mmas8Interactor";


const express = require('express');

const router = express.Router();

const repository = new MMASEightRepository();
const interactor = new MMASEightInteractor(repository);

const controllers = new MMASEightController(interactor);


router.post('/add', controllers.onCreateMMASEight.bind(controllers));
router.get('/fetchAll', controllers.onGetAllMMASEight.bind(controllers));
router.get('/detail/:id', controllers.onGetMMASEightById.bind(controllers));
router.get("/by-patient-id/:id", controllers.onGetMMASEightByPatientId.bind(controllers));
// router.put('/edit/:id', editTimeAndWork);

export { router as mmasEightRouter }
