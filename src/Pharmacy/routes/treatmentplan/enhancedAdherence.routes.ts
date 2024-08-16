import { EnhancedAdherenceController } from "../../adapters/controllers/treatmentplan/enhancedAdherenceController";
import { EnhancedAdherenceRepository } from "../../adapters/repositories/treatmentplan/enhancedAdherenceRepository";
import { EnhancedAdherenceInteractor } from "../../application/interactors/treatmentplan/enhacendAdherenceInteractor";

const express = require('express');

const router = express.Router();

const repository = new EnhancedAdherenceRepository();
const interactor = new EnhancedAdherenceInteractor(repository);

const controllers = new EnhancedAdherenceController(interactor);


router.post('/add', controllers.onCreateEnhancedAdherence.bind(controllers));
router.get('/fetchAll', controllers.onGetAllEnhancedAdherence.bind(controllers));
router.get('/detail/:id', controllers.onGetEnhancedAdherenceById.bind(controllers));
// router.put('/edit/:id', editTimeAndWork);

export { router as enhancedAdherenceRouter };
