import { DisclosureChecklistController } from "../../adapters/controllers/controllers/treatementplan/disclosureChecklist.controller";

const express = require('express');

const router = express.Router();

const controllers = new DisclosureChecklistController();


router.post('/add', controllers.create);
router.get('/fetchAll', controllers.find);
router.get('/detail/:id', controllers.findById);
router.get('/details/:id', controllers.findAllByVisitId);
// router.put('/edit/:id', editTimeAndWork);

export { router as disclosureChecklistRouter };
