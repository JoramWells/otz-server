/* eslint-disable @typescript-eslint/no-misused-promises */


import express from 'express'
import { PatientSessionLogRepository } from '../adapters/repositories/patientSessionRepository'
import { PatientSessionLogInteractor } from '../application/interactors/patientSessionInteractor'
import { PatientSessionLogController } from '../adapters/controllers/patientSessionController'


const repository = new PatientSessionLogRepository()
const interactor = new PatientSessionLogInteractor(repository)

const patientController = new PatientSessionLogController(interactor)

const router = express.Router()

router.post('/add', patientController.onCreatePatientSessionLog.bind(patientController))
router.get('/fetchAll', patientController.onGetAllPatientSessionLogs.bind(patientController))
router.get('/detail/:id', patientController.onGetPatientSessionLogById.bind(patientController))
router.put('/edit/:id', patientController.onEditPatientSessionLog.bind(patientController))

router.delete('/delete/:id', patientController.onDeletePatient.bind(patientController));

export {router as patientSessionLogRouter}
