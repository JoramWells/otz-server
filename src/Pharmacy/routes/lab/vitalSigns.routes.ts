/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import { VitalSignsRepository } from '../../adapters/repositories/lab/vitalSignRepository'
import { VitalSignsInteractor } from '../../application/interactors/lab/vitalSignInteractor'
import { VitalSignsController } from '../../adapters/controllers/lab/vitalSigns.controller'

const repository = new VitalSignsRepository()
const interactor = new VitalSignsInteractor(repository)

const patientController = new VitalSignsController(interactor)

const router = express.Router()

router.post('/add', patientController.onCreateVitalSign.bind(patientController))
router.get('/fetchAll', patientController.onGetAllVitalSigns.bind(patientController))
router.get('/detail/:id', patientController.onGetVitalSignById.bind(patientController))
router.get(
  "/by-visit-id/:id",
  patientController.onGetVitalSignByVisitId.bind(patientController)
);
router.get(
  "/by-patient-id/:id",
  patientController.onGetVitalSignPatientId.bind(patientController)
);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as vitalSignRouter }
