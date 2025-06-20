import { PartialDisclosureController } from "../../../adapters/controllers/controllers/treatementplan/partial/partialDisclosure.controller";

const express = require('express');

const router = express.Router();


const controllers = new PartialDisclosureController();


router.post('/add', controllers.create);
router.get('/fetchAll', controllers.find);
router.get(
  "/detail/:id",
  controllers.findById
);
router.get(
  "/by-patient-id/:id",
  controllers.findByPatientId
);
router.get('/details/:id', controllers.findAllByVisitId);
// router.put('/edit/:id', editTimeAndWork);

// 
router.get(
  "/score",
  controllers.findPartialDisclosureScoreCategory
);


export { router as partialDisclosureRouter };
