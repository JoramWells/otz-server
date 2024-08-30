
import express from 'express'
import { HomeVisitRepository } from '../../adapters/repositories/homevisit/homeVisitRepository'
import { HomeVisitInteractor } from '../../application/interactors/homevisit/homeVisitInteractor'
import { HomeVisitController } from '../../adapters/controllers/homevisit/homeVisitController'

const repository = new HomeVisitRepository()
const interactor = new HomeVisitInteractor(repository)

const controller = new HomeVisitController(interactor)

const router = express.Router()

router.post('/add', controller.onCreateAHomeVisit.bind(controller))
router.get('/fetchAll', controller.onGetAllHomeVisits.bind(controller))
router.get('/detail/:id', controller.onGetAHomeVisitById.bind(controller))
router.get("/details/:id", controller.onGetAllHomeVisitById.bind(controller));
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as homeVisitRouter }
