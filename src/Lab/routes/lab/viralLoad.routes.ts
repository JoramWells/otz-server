/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import { ViralLoadRepository } from '../../adapters/repositories/lab/viralLoadRepository'
import { ViralLoadInteractor } from '../../application/interactors/lab/ViralLoadInteractor'
import { ViralLoadController } from '../../adapters/controllers/lab/viralLoadController'

const repository = new ViralLoadRepository()
const interactor = new ViralLoadInteractor(repository)

const controller = new ViralLoadController(interactor)

const router = express.Router()


router.post('/add', controller.onCreateViralLoad.bind(controller))
router.get(
  '/fetchAll',
  controller.onGetAllViralLoads.bind(controller)
)
router.get(
  '/detail/:id',  controller.onGetViralLoadById.bind(controller)
)
router.get("/fetchAllVLCategory", controller.onGetCategories.bind(controller));
router.get("/group-by-vl-reasons", controller.onGetVLReasons.bind(controller));
router.get("/suppression-rate", controller.onGetSuppressionRate.bind(controller));
router.get("/details/:id", controller.onGetByPatientId.bind(controller));
router.get("/by-patient-id/:id", controller.onGetByPatientId.bind(controller));
router.get(
  "/starred-viral-load",
  controller.onGetStarredViralLoad.bind(controller)
);
router.get(
  "/recent-viral-load",
  controller.onGetRecentVL.bind(controller)
);
router.get("/vl-for-appointment", controller.onGetVLForAppointment.bind(controller));
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as viralLoadRouter }
