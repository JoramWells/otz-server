/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import { ChronicIllnessInteractor } from '../application/interactors/chronicIllnessInteractor'
import { ChronicIllnessController } from '../adapters/controllers/chronicIllnessController'
import { ChronicIllnessRepository } from '../adapters/repositories/chronicIllnessRepository'

const repository = new ChronicIllnessRepository()
const interactor = new ChronicIllnessInteractor(repository)

const controller = new ChronicIllnessController(interactor)

const router = express.Router()

router.post('/add', controller.onCreateChronicIllness.bind(controller))
router.get('/fetchAll', controller.onGetAllChronicIllness.bind(controller))
router.get('/detail/:id', controller.onGetChronicIllnessById.bind(controller))
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as chronicIllnessRouter }
