/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { PatientAllergiesRepository } from '../adapters/repositories/patientAllergiesRepository'
import { PatientAllergiesController } from '../adapters/controllers/patientAllergiesController'
import { PatientAllergiesInteractor } from '../application/interactors/patientAllergiesInteractor'

const router = express.Router()

const repository = new PatientAllergiesRepository()
const interactor = new PatientAllergiesInteractor(repository)
const controller = new PatientAllergiesController(interactor)

router.post('/add', controller.onCreatePatientAllergies.bind(controller))
router.get('/fetchAll', controller.onGetAllPatientAllergies.bind(controller))
router.get('/detail/:id', controller.onGetPatientAllergiesById.bind(controller))
// router.put('/edit/:id', editUser)
// router.delete('/delete/:id', deleteUser)

export { router as patientAllergiesRouter }
