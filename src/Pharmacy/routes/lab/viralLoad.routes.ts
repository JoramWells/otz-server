/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import { ViralLoadController } from '../../adapters/controllers/lab/viralLoad.controller'


const controller = new ViralLoadController()

const router = express.Router()


router.post('/add', controller.create)
router.get(
  '/fetchAll',
  controller.find
)
router.get(
  '/detail/:id',  controller.findById
)
router.get("/fetchAllVLCategory", controller.findCategories);
router.get("/group-by-vl-reasons", controller.findAllVlReasons);
router.get("/suppression-rate", controller.findSuppressionRate);
router.get("/details/:id", controller.findByPatientId);
router.get(
  "/starred-viral-load",
  controller.findStarredViralLoad
);
router.get(
  "/recent-viral-load",
  controller.findRecent
);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as viralLoadRouter }
