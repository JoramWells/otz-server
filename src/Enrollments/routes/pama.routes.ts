/* eslint-disable @typescript-eslint/no-misused-promises */
import { PAMARepository } from '../adapters/repositories/pamaRepository'

import express from 'express'
import { PAMAInteractor } from '../application/interactors/PAMAInteractor'
import { PAMAController } from '../adapters/controllers/pamaController'

const repository = new PAMARepository()
const interactor = new PAMAInteractor(repository)

const controller = new PAMAController(interactor)

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

export { router as pamaRouter }
