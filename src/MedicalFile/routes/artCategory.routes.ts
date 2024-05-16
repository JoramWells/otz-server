/* eslint-disable @typescript-eslint/no-misused-promises */
import { ARTCategoryController } from '../adapters/controllers/artCategoryController'
import { ARTCategoryRepository } from '../adapters/repositories/artCategoryRepository'
import { ArtCategoryInteractor } from '../application/interactors/artCategoryInteractor'

import express from 'express'

const repository = new ARTCategoryRepository()
const interactor = new ArtCategoryInteractor(repository)

const patientController = new ARTCategoryController(interactor)

const router = express.Router()

router.post('/add', patientController.onCreateARTCategory.bind(patientController))
router.get('/fetchAll', patientController.onGetAllARTCategories.bind(patientController))
router.get('/detail/:id', patientController.onGetARTCategoryById.bind(patientController))
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as artCategoryRouter }
