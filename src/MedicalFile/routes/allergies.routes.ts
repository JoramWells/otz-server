/* eslint-disable @typescript-eslint/no-misused-promises */
import { AllergiesRepository } from '../adapters/repositories/allergiesRepository'

import express from 'express'
import { AllergiesInteractor } from '../application/interactors/allergiesInteractor'
import { AllergiesController } from '../adapters/controllers/allergiesController'

const repository = new AllergiesRepository()
const interactor = new AllergiesInteractor(repository)

const patientController = new AllergiesController(interactor)

const router = express.Router()

router.post('/add', patientController.onCreateAllergies.bind(patientController))
router.get('/fetchAll', patientController.onGetAllergiesById.bind(patientController))
router.get('/detail/:id', patientController.onGetAllergiesById.bind(patientController))
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as allergiesRouter }
