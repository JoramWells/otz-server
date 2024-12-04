/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import { CALHIVRepository } from '../adapters/repositories/calHIVRepository'
import { CALHIVInteractor } from '../application/interactors/calHIVInteractor'
import { CALHIVController } from '../adapters/controllers/calHIVController'


const repository = new CALHIVRepository()
const interactor = new CALHIVInteractor(repository)

const controller = new CALHIVController(interactor)

const router = express.Router()

router.post('/add', controller.onCreateCALHIV.bind(controller))
router.get(
  '/fetchAll',
  controller.onGetAllCALHIVs.bind(controller)
)
router.get(
  '/detail/:id',
  controller.onGetCALHIVById.bind(controller)
)

router.get("/casemanager-by-patient-id/:id", controller.onGetCALHIVByPatientId.bind(controller));
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as CALHIVRouter }
