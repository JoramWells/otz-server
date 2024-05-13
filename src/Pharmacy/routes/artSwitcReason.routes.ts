/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { ARTSwitchReasonRepository } from '../adapters/repositories/artSwitchReasonRepository'
import { ARTSwitchReasonInteractor } from '../application/interactors/artSwitchReasonInteractor'
import { ARTSwitchReasonController } from '../adapters/controllers/artSwitchReasonController'

const router = express.Router()

const repository = new ARTSwitchReasonRepository()
const interactor = new ARTSwitchReasonInteractor(repository)
const controller = new ARTSwitchReasonController(interactor)

router.post('/add', controller.onCreateARTSwitchReason.bind(controller))
router.get('/fetchAll', controller.onGetAllARTSwitchReasons.bind(controller))
router.get('/detail/:id', controller.onGetARTSwitchReasonByID.bind(controller))
// router.put('/edit/:id', editUser)
// router.delete('/delete/:id', deleteUser)

export { router as artSwitchReasonRouter }
