import { FollowUpChecklistController } from "../../adapters/controllers/treatementplan/followUpChecklist.controller";

const express = require('express');

const router = express.Router();

const controllers = new FollowUpChecklistController();


router.post('/add', controllers.create);
router.get('/fetchAll', controllers.find);
router.get('/detail/:id', controllers.findById);
// router.put('/edit/:id', editTimeAndWork);

export { router as followUpChecklistRouter };
