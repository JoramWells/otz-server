/* eslint-disable @typescript-eslint/no-misused-promises */


import express from 'express'
import { ImportantPatientRepository } from '../adapters/repositories/importantPatientRepository'
import { ImportantPatientInteractor } from '../application/interactors/importantPatientInteractor'
import { ImportantPatientController } from '../adapters/controllers/importantPatientController'


const repository = new ImportantPatientRepository()
const interactor = new ImportantPatientInteractor(repository)

const controller = new ImportantPatientController(interactor)

const router = express.Router()

router.post('/add', controller.onCreateImportantPatient.bind(controller))
router.get('/fetchAll', controller.onGetAllImportantPatients.bind(controller))
router.get('/detail/:id', controller.onGetImportantPatientById.bind(controller))
router.put('/edit/:id', controller.onEditImportantPatient.bind(controller))

router.delete('/delete/:id', controller.onDeleteImportantPatient.bind(controller));

export {router as importantPatientRouter}
