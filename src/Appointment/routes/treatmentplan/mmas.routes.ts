import { MMASController } from "../../adapters/controllers/treatementplan/mmasController";
import { MMASRepository } from "../../adapters/repositories/treatmentplan/mmasRepository";
import { MMASInteractor } from "../../application/interactors/treatmentplan/mmasInteractor";

const express = require('express');

const router = express.Router();

const repository = new MMASRepository();
const interactor = new MMASInteractor(repository);

const controllers = new MMASController(interactor);


router.post('/add', controllers.onCreateMMAS.bind(controllers));
router.get('/fetchAll', controllers.onGetAllMMAS.bind(controllers));
router.get('/detail/:id', controllers.onGetMMASById.bind(controllers));
// router.put('/edit/:id', editTimeAndWork);

export { router as mmasRouter }
