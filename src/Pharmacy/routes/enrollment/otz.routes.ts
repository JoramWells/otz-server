/* eslint-disable @typescript-eslint/no-misused-promises */

import express from 'express'
import { OTZController } from '../../adapters/controllers/enrollment/otz.controller'


const controller = new OTZController()

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
router.delete('/delete/:id', controller.delete);


export { router as otzRouter }
