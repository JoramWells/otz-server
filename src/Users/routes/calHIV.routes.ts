/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import { CALHIVController } from '../controllers/calhiv.controller'

const controller = new CALHIVController()

const router = express.Router()

router.post('/add', controller.create)
router.get(
  '/fetchAll',
  controller.find
)
router.get(
  '/by-hospital-id',
  controller.findByHospitalId
)

// router.get("/casemanager-by-patient-id/:id", controller.onGetCALHIVByPatientId);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as CALHIVRouter }
