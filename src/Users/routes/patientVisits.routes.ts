/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import { PatientVisitController } from '../adapters/controllers/patientVisit.controller'



const controller = new PatientVisitController()

const router = express.Router()

router.post('/add', controller.create)
router.get(
  '/fetchAll',
  controller.find
)
router.get(
  '/detail/:id',
  controller.findById
)

router.get("/by-patient-visit-count", controller.findPatientVisitByCount);

router.get('/patient-history/:id', controller.findHistoryById)
router.get('/users/:id', controller.findPatientVisitByUserId)
router.get('/user-patient-count/:id', controller.findUserPatientCount)
router.get('/user-activities-count/:id', controller.findUserActivitiesCount)
router.get('/patient-visit-count/:id', controller.findPatientVisitCount)
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as patientVisitRouter }
