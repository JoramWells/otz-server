/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { ARTRepository } from '../adapters/repositories/artRepository'
import { ARTInteractor } from '../application/interactors/artInteractor'
import { ARTController } from '../adapters/controllers/artController'

const repository = new ARTRepository()
const interactor = new ARTInteractor(repository)

const controller = new ARTController(interactor)

const router = express.Router()

router.post('/add', controller.onCreateART.bind(controller))
router.get(
  '/fetchAll',
  controller.onGetAllARTs.bind(controller)
)
router.get(
  '/detail/:id',
  controller.onGetARTById.bind(controller)
)
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as artRouter }
