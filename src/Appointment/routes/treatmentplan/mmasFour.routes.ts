import { MMASFourController } from "../../adapters/controllers/treatementplan/mmasFourController";
import { MMASFourRepository } from "../../adapters/repositories/treatmentplan/mmas4Repository";
import { MMASFourInteractor } from "../../application/interactors/treatmentplan/mmas4Interactor";

const express = require('express');

const router = express.Router();

const repository = new MMASFourRepository();
const interactor = new MMASFourInteractor(repository);

const controllers = new MMASFourController(interactor);


router.post('/add', controllers.onCreateMMASFour.bind(controllers));
router.get('/fetchAll', controllers.onGetAllMMASFour.bind(controllers));
router.get('/detail/:id', controllers.onGetMMASFourById.bind(controllers));
// router.put('/edit/:id', editTimeAndWork);

export { router as mmasFourRouter }
