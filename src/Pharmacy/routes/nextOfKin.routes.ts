/* eslint-disable @typescript-eslint/no-misused-promises */
import { NextOfKinRepository } from '../adapters/repositories/nextOfKinRepository'

import express from 'express'
import { NextOfKinInteractor } from '../application/interactors/nextOfKinInterator'
import { NextOfKinController } from '../adapters/controllers/nextOfKinController'

const repository = new NextOfKinRepository()
const interactor = new NextOfKinInteractor(repository)

const controller = new NextOfKinController(interactor)

const router = express.Router()

router.post('/add', controller.onCreateNextOfKin.bind(controller))
router.get(
  '/fetchAll',
  controller.onGetAllNextOfKins.bind(controller)
)
router.get(
  '/detail/:id',
  controller.onGetNextOfKinsById.bind(controller)
)
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as nextOfKinRouter }
