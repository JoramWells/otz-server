/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import { TransferOutRepository } from '../../adapters/repositories/transfer/transferOutRepository'
import { TransferOutInteractor } from '../../application/interactors/transfer/transferOutInteractor'
import { TransferOutController } from '../../adapters/controllers/transfer/transferOutController'

const repository = new TransferOutRepository()
const interactor = new TransferOutInteractor(repository)

const controller = new TransferOutController(interactor)

const router = express.Router()

router.post('/add', controller.onCreateTransferOut.bind(controller))
router.get(
  '/fetchAll',
  controller.onGetAllTransferOuts.bind(controller)
)
router.get(
  '/by-hospital-id',
  controller.onGetTransferOutByHospitalId.bind(controller)
)

router.get(
  "/by-patient-id/:id",
  controller.onGetTransferOutByPatientId.bind(controller)
);

router.get(
  "/all-by-patient-id",
  controller.onGetAllTransferOutByPatientId.bind(controller)
);
// router.get("/casemanager-by-patient-id/:id", controller.onGetTransferOutByPatientId.bind(controller));
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as transferOutRouter }
