/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import { PMTCTProfileRepository } from '../adapters/repositories/pmtctProfileRepository'
import { PMTCTInteractor } from '../application/interactors/PMTCTProfileInteractor'
import { PMTCTProfileController } from '../adapters/controllers/pmtctProfileController'

const repository = new PMTCTProfileRepository()
const interactor = new PMTCTInteractor(repository)

const controller = new PMTCTProfileController(interactor)

const router = express.Router()

router.post('/add', controller.onCreatePMTCTProfile.bind(controller))
router.get(
  '/fetchAll',
  controller.onGetAllPMTCTProfiles.bind(controller)
)
router.get(
  '/detail/:id',
  controller.onGetPMTCTProfileById.bind(controller)
)
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as pmtctProfileRouter }
