import { MMASEightController } from "../../adapters/controllers/controllers/treatementplan/mmas8.controller";


const express = require('express');

const router = express.Router();

const controllers = new MMASEightController();


router.post('/add', controllers.create);
router.get('/fetchAll', controllers.find);
router.get('/detail/:id', controllers.findById);
router.get("/by-patient-id/:id", controllers.findByPatientId);
router.get("/by-visit-id/:id", controllers.findByVisitId);
// router.put('/edit/:id', editTimeAndWork);

export { router as mmasEightRouter }
