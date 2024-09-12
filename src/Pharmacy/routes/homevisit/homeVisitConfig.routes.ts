
import express from 'express'
import { HomeVisitConfigInteractor } from '../../application/interactors/homevisit/homeVisitConfigInteractor'
import { HomeVisitConfigRepository } from '../../adapters/repositories/homevisit/homeVisitConfigRepository'
import { HomeVisitConfigController } from '../../adapters/controllers/homevisit/homeVisitConfigController'

const repository = new HomeVisitConfigRepository()
const interactor = new HomeVisitConfigInteractor(repository)

const controller = new HomeVisitConfigController(interactor)

const router = express.Router()

router.post('/add', controller.onCreateAHomeVisitConfig.bind(controller))
router.get('/fetchAll', controller.onGetAllHomeVisitConfig.bind(controller))
router.get('/detail/:id', controller.onGetAHomeVisitConfigById.bind(controller))
// router.get("/details/:id", controller.onGetAllHomeVisitById.bind(controller));
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as homeVisitConfigRouter }
