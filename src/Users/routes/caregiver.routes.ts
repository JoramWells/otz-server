

import express from 'express'
import { CaregiverController } from '../controllers/caregiver.controller'


const controller = new CaregiverController()

const router = express.Router()

router.post('/add', controller.create)
router.get(
  '/fetchAll',
  controller.find
)
router.get(
  '/detail/:id',
  controller.findById
)
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as caregiverRoutes }
