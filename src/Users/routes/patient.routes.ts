/* eslint-disable @typescript-eslint/no-misused-promises */
import { PatientController } from '../adapters/controllers/patientController'
import { PatientRepository } from '../adapters/repositories/patientRepository'
import { PatientInteractor } from '../application/interactors/patientInteractor'

import express from 'express'

const repository = new PatientRepository()
const interactor = new PatientInteractor(repository)

const patientController = new PatientController(interactor)

const router = express.Router()

router.post('/add', patientController.onCreatePatient.bind(patientController))
router.get('/fetchAll', patientController.onGetAllPatients.bind(patientController))
router.get('/detail/:id', patientController.onGetPatientById.bind(patientController))
router.get('/fetchAllPMTCT', patientController.onGetAllPMTCTPatients.bind(patientController))
router.get('/fetchAllOTZ', patientController.onGetAllOTZPatients.bind(patientController))
router.put('/edit/:id', patientController.onEditPatientProfile.bind(patientController))
router.post("/login", patientController.login.bind(patientController));
router.put("/mark-important/:id", patientController.onMarkAsImportant.bind(patientController));

// router.delete('/delete/:id', deletePatient);

module.exports = router
