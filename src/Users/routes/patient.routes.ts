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
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

module.exports = router