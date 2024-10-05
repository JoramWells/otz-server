/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { PrescriptionRepository } from '../adapters/repositories/prescriptionRepository'
import { PrescriptionInteractor } from '../application/interactors/prescriptionInteractor'
import { PrescriptionController } from '../adapters/controllers/prescriptionController'

const router = express.Router()

const repository = new PrescriptionRepository()
const interactor = new PrescriptionInteractor(repository)
const controller = new PrescriptionController(interactor)

router.post('/add', controller.onCreatePrescription.bind(controller))
router.get('/fetchAll', controller.onGetAllPrescriptions.bind(controller))
router.get('/facility-adherence', controller.onGetFacilityAdherence.bind(controller))
router.get('/detail/:id', controller.onGetPrescriptionById.bind(controller))
router.get('/details/:id', controller.onGetPrescriptionDetails.bind(controller))
router.get('/prescription-details/:id', controller.onGetPrescriptionByPatientId.bind(controller))
router.put('/edit/:id', controller.onEditPrescription.bind(controller))
// router.delete('/delete/:id', deleteUser)

export { router as prescriptionRouter }
