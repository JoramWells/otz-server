/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import { VitalSignsController } from '../../adapters/controllers/lab/vitalSign.controller'



const patientController = new VitalSignsController()

const router = express.Router()

router.post('/add', patientController.create)
router.get('/fetchAll', patientController.find)
router.get('/detail/:id', patientController.findById)
router.get(
  "/by-visit-id/:id",
  patientController.findByVisitId
);
router.get(
  "/by-patient-id/:id",
  patientController.findByPatientId
);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as vitalSignRouter }
