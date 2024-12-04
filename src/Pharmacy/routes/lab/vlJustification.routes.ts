/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import { VLJustificationRepository } from '../../adapters/repositories/lab/vlJustificationRepository'
import { VLJustificationInteractor } from '../../application/interactors/lab/vlJustificationInteractor'
import { VLJustificationController } from '../../adapters/controllers/lab/vlJustificationController'

const repository = new VLJustificationRepository()
const interactor = new VLJustificationInteractor(repository)

const patientController = new VLJustificationController(interactor)

const router = express.Router()

router.post('/add', patientController.onCreateVLJustification.bind(patientController))
router.get('/fetchAll', patientController.onGetAllVLJustifications.bind(patientController))
router.get('/detail/:id', patientController.onGetVLJustificationById.bind(patientController))
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as vlJustificationRouter }
