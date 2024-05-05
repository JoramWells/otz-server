/* eslint-disable @typescript-eslint/no-misused-promises */
import { OTZController } from '../../adapters/controllers/enrollment/otzController'
import { OTZRepository } from '../../adapters/repositories/enrollment/otzRepository'
import { OTZInteractor } from '../../application/interactors/enrollment/OTZInteractor'

import express from 'express'

const repository = new OTZRepository()
const interactor = new OTZInteractor(repository)

const controller = new OTZController(interactor)

const router = express.Router()

router.post('/add', controller.onCreateOTZ.bind(controller))
router.get(
  '/fetchAll',
  controller.onGetAllOTZs.bind(controller)
)
router.get(
  '/detail/:id',
  controller.onGetOTZById.bind(controller)
)
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as otzRouter }
