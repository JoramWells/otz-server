/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import { MeasuringUnitRepository } from '../adapters/repositories/measuringUnitRepository'
import { MeasuringUnitInteractor } from '../application/interactors/measuringUnitInteractor'
import { MeasuringUnitController } from '../adapters/controllers/measuringUnitController'

const repository = new MeasuringUnitRepository()
const interactor = new MeasuringUnitInteractor(repository)

const controller = new MeasuringUnitController(interactor)

const router = express.Router()

router.post('/add', controller.onCreateMeasuringUnit.bind(controller))
router.get(
  '/fetchAll',
  controller.onGetAllARTCategories.bind(controller)
)
router.get(
  '/detail/:id',
  controller.onGetMeasuringUnitById.bind(controller)
)
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as measuringUnitRouter }
