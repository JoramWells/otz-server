/* eslint-disable @typescript-eslint/no-misused-promises */
import { PatientVisitRepository } from '../adapters/repositories/patientVisitRepository'

import express from 'express'
import { PatientVisitInteractor } from '../application/interactors/patientVisitInteractor'
import { PatientVisitController } from '../adapters/controllers/patientVisitController'

const repository = new PatientVisitRepository()
const interactor = new PatientVisitInteractor(repository)

const controller = new PatientVisitController(interactor)

const router = express.Router()

router.post('/add', controller.onCreatePatientVisit.bind(controller))
router.get(
  '/fetchAll',
  controller.onGetAllPatientVisits.bind(controller)
)
router.get(
  '/detail/:id',
  controller.onGetPatientVisitById.bind(controller)
)

router.get('/patient-history/:id', controller.onGetAllPatientHistoryVisitById.bind(controller))
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as patientVisitRouter }
