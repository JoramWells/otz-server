
import express from 'express'
import { HomeVisitConfigController } from '../../adapters/controllers/homevisit/homeVisitConfig.controller'


const controller = new HomeVisitConfigController()

const router = express.Router()

router.post('/add', controller.create)
router.get('/fetchAll', controller.find)
router.get('/detail/:id', controller.findAllById)
// router.get("/details/:id", controller.onGetAllHomeVisitById);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as homeVisitConfigRouter }
