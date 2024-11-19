/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import { PAMARepository } from '../../adapters/repositories/enrollment/pamaRepository'
import { PAMAController } from '../../adapters/controllers/enrollment/pamaController'
import { PAMAInteractor } from '../../application/interactors/enrollment/PAMAInteractor'

const repository = new PAMARepository()
const interactor = new PAMAInteractor(repository)

const controller = new PAMAController(interactor)

const router = express.Router()

router.post('/add', controller.onCreatePAMA.bind(controller))
router.get(
  '/fetchAll',
  controller.onGetAllPAMAs.bind(controller)
)
router.get(
  '/detail/:id',
  controller.onGetPAMAById.bind(controller)
)
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as pamaRouter }
