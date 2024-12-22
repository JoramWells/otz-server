/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import { TransferInRepository } from '../../adapters/repositories/transfer/transferInRepository'
import { TransferInInteractor } from '../../application/interactors/transfer/transferInInteractor'
import { TransferInController } from '../../adapters/controllers/transfer/transferInController'

const repository = new TransferInRepository()
const interactor = new TransferInInteractor(repository)

const controller = new TransferInController(interactor)

const router = express.Router()

router.post('/add', controller.onCreateTransferIn.bind(controller))
router.get(
  '/fetchAll',
  controller.onGetAllTransferIns.bind(controller)
)
router.get(
  '/by-hospital-id',
  controller.onGetTransferInByHospitalId.bind(controller)
)

router.put("/verify-transfer-in/:id", controller.onVerifyTransferIn.bind(controller));
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as transferInRouter }
