
import express from 'express'
import { CaseManagerController } from '../controllers/casemanager.controller'


const controller = new CaseManagerController()

const router = express.Router()

router.post('/add', controller.create)
router.get(
  '/fetchAll',
  controller.find
)
router.get(
  '/detail/:id',
  controller.findById
)

router.get("/casemanager-by-patient-id/:id", controller.findByPatientId);
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as caseManagerRoutes }
