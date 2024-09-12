/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import { HomeVisitReasonRepository } from '../../adapters/repositories/homevisit/homeVisitReasonRepository'
import { HomeVisitReasonInteractor } from '../../application/interactors/homevisit/homeVisitReasonInteractor'
import { HomeVisitReasonController } from '../../adapters/controllers/homevisit/homeVisitReasonController'

const repository = new HomeVisitReasonRepository()
const interactor = new HomeVisitReasonInteractor(repository)

const controller = new HomeVisitReasonController(interactor)

const router = express.Router()

router.post('/add', controller.onCreateHomeVisitReason.bind(controller))
router.get('/fetchAll', controller.onGetAllHomeVisitReasons.bind(controller))
router.get('/detail/:id', controller.onGetHomeVisitReasonById.bind(controller))
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as homeVisitReasonRouter }
