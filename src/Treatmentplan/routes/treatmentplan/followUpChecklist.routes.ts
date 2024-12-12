import { FollowUpChecklistController } from "../../adapters/controllers/treatementplan/followUpChecklistController";
import { FollowUpChecklistRepository } from "../../adapters/repositories/treatmentplan/followUpChecklistRepository";
import { FollowUpChecklistInteractor } from "../../application/interactors/treatmentplan/followUpChecklistInteractor";

const express = require('express');

const router = express.Router();

const repository = new FollowUpChecklistRepository();
const interactor = new FollowUpChecklistInteractor(repository);

const controllers = new FollowUpChecklistController(interactor);


router.post('/add', controllers.onCreateFollowUpChecklist.bind(controllers));
router.get('/fetchAll', controllers.onGetAllFollowUpChecklist.bind(controllers));
router.get('/detail/:id', controllers.onGetFollowUpChecklistById.bind(controllers));
// router.put('/edit/:id', editTimeAndWork);

export { router as followUpChecklistRouter };
