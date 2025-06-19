/* eslint-disable @typescript-eslint/no-misused-promises */


import express from 'express'
import { ImportantPatientController } from '../controllers/importantPatient.controller'

const controller = new ImportantPatientController()

const router = express.Router()

router.post('/add', controller.createImportantPatient)
router.get('/fetchAll', controller.getAllImportantPatients)
router.get('/detail/:id', controller.getImportantPatientsByUserId)
router.get('/important-by-patient-id/:id', controller.getImportantPatientById)
router.put('/edit/:id', controller.updateImportantPatient)

router.delete('/delete/:id', controller.deleteImportantPatient);

export {router as importantPatientRouter}
