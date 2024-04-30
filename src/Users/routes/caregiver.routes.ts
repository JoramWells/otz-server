/* eslint-disable @typescript-eslint/no-misused-promises */
import { CaregiverController } from '../adapters/controllers/caregiverController'
import { CaregiverRepository } from '../adapters/repositories/caregiverRepository'
import { CaregiverInteractor } from '../application/interactors/caregiverInterator'

import express from 'express'

const repository = new CaregiverRepository()
const interactor = new CaregiverInteractor(repository)

const controller = new CaregiverController(interactor)

const router = express.Router()

router.post('/add', controller.onCreateCaregiver.bind(controller))
router.get(
  '/fetchAll',
  controller.onGetAllCaregivers.bind(controller)
)
router.get(
  '/detail/:id',
  controller.onGetCaregiverById.bind(controller)
)
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as caregiverRoutes }
