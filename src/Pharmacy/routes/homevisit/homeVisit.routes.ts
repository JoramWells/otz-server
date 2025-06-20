
import express from 'express'
import { HomeVisitController } from '../../adapters/controllers/homevisit/homeVisit.controller'

const controller = new HomeVisitController()

const router = express.Router()

router.post('/add', controller.create)
router.get('/fetchAll', controller.find)
router.get('/detail/:id', controller.findById)
router.get("/details/:id", controller.findAllById);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as homeVisitRouter }
