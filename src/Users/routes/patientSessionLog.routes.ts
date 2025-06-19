/* eslint-disable @typescript-eslint/no-misused-promises */


import express from 'express'
import { PatientSessionLogController } from '../controllers/patientSession.controller'


const patientController = new PatientSessionLogController()

const router = express.Router()

router.post('/add', patientController.create)
router.get('/fetchAll', patientController.find)
router.get('/detail/:id', patientController.findById)
router.put('/edit/:id', patientController.edit)

router.delete('/delete/:id', patientController.delete);

export {router as patientSessionLogRouter}
