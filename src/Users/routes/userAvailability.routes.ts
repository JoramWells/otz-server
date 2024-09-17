/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { UserAvailabilityRepository } from '../adapters/repositories/userAvailabilityRepository'
import { UserAvailabilityInteractor } from '../application/interactors/userAvailabilityInteractor'
import { UserAvailabilityController } from '../adapters/controllers/userAvailabilityController'

const router = express.Router()

const repository = new UserAvailabilityRepository()
const interactor = new UserAvailabilityInteractor(repository)
const controller = new UserAvailabilityController(interactor)

router.post('/add', controller.onCreateUserAvailability.bind(controller))
router.get('/fetchAll', controller.onGetAllUserAvailabilities.bind(controller))
router.get('/detail/:id', controller.onGetUserAvailabilityById.bind(controller))
router.put('/edit/:id', controller.onEditUserAvailability.bind(controller))
// router.delete('/delete/:id', deleteUser)

export { router as userAvailabilityRoutes }
