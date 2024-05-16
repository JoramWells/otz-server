/* eslint-disable @typescript-eslint/no-misused-promises */
import { CaseManagerRepository } from '../adapters/repositories/caseManagerRepository'

import express from 'express'
import { CaseManagerInteractor } from '../application/interactors/caseManagerInteractor'
import { CaseManagerController } from '../adapters/controllers/caseManagerController'

const repository = new CaseManagerRepository()
const interactor = new CaseManagerInteractor(repository)

const controller = new CaseManagerController(interactor)

const router = express.Router()

router.post('/add', controller.onCreateCaseManager.bind(controller))
router.get(
  '/fetchAll',
  controller.onGetAllCaseManagers.bind(controller)
)
router.get(
  '/detail/:id',
  controller.onGetCaseManagerById.bind(controller)
)
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as caseManagerRoutes }
