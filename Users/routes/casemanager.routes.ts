/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'

import {
  addCaseManager,
  deleteCaseManager,
  editCaseManager,
  getAllCaseManagers,
  getCaseManagerDetail
} from '../controllers/casemanager.controller'

const router = express.Router()

router.post('/add', addCaseManager)
router.get('/fetchAll', getAllCaseManagers)
router.get('/detail/:id', getCaseManagerDetail)
router.put('/edit/:id', editCaseManager)
router.delete('/delete/:id', deleteCaseManager)

export { router as CaseManagerRouter }
