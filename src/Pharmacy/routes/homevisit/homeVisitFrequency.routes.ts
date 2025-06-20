/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { HomeVisitFrequencyController } from '../../adapters/controllers/homevisit/homeVisitFrequency.controller'

const router = express.Router()


const controller = new HomeVisitFrequencyController()

router.post('/add', controller.create)
router.get('/fetchAll', controller.find)
router.get('/detail/:id', controller.findById)
// router.put('/edit/:id', editUser)
// router.delete('/delete/:id', deleteUser)

export { router as homeVisitFrequencyRouter }
