/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import { ARTPrescriptionRepository } from '../adapters/repositories/artPrescriptionRepository'
import { ArtPrescriptionInteractor } from '../application/interactors/artPrescriptionInteractor'
import { ARTPrescriptionController } from '../adapters/controllers/artPrescriptionController'

const repository = new ARTPrescriptionRepository()
const interactor = new ArtPrescriptionInteractor(repository)

const controller = new ARTPrescriptionController(interactor)

const router = express.Router()

router.post('/add', controller.onCreateARTPrescription.bind(controller))
router.get('/fetchAll', controller.onGetAllARTPrescriptions.bind(controller))
router.get('/detail/:id', controller.onGetARTPrescriptionById.bind(controller))
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as artPrescriptionRouter }
