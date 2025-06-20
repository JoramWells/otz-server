/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import { PAMAController } from '../../adapters/controllers/enrollment/pama.controller'

const controller = new PAMAController()

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
// router.put('/edit/:id', editPatient);
// router.delete('/delete/:id', deletePatient);

export { router as pamaRouter }
