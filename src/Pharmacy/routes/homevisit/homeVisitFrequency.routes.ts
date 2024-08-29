/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { HomeVisitFrequencyRepository } from '../../adapters/repositories/homevisit/homeVisitFrequencyRepository'
import { HomeVisitFrequencyInteractor } from '../../application/interactors/homevisit/homeVisitFrequencyInteractor'
import { HomeVisitFrequencyController } from '../../adapters/controllers/homevisit/homeVisitFrequencyController'

const router = express.Router()

const repository = new HomeVisitFrequencyRepository()
const interactor = new HomeVisitFrequencyInteractor(repository)
const controller = new HomeVisitFrequencyController(interactor)

router.post('/add', controller.onCreateHomeVisitFrequency.bind(controller))
router.get('/fetchAll', controller.onGetAllHomeVisitFrequencies.bind(controller))
router.get('/detail/:id', controller.onGetHomeVisitFrequencyById.bind(controller))
// router.put('/edit/:id', editUser)
// router.delete('/delete/:id', deleteUser)

export { router as homeVisitFrequencyRouter }
