/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import { VLJustificationController } from '../../adapters/controllers/lab/vlJustification.controller'


const patientController = new VLJustificationController()

const router = express.Router()

router.post('/add', patientController.create)
router.get('/fetchAll', patientController.find)
router.get('/detail/:id', patientController.findById)
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as vlJustificationRouter }
