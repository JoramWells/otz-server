/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { UserAvailabilityController } from '../controllers/userAvailability.controller'


const router = express.Router()

const controller = new UserAvailabilityController()

router.post('/add', controller.create)
router.get('/fetchAll', controller.find)
router.get('/detail/:id', controller.findById)
router.put('/edit/:id', controller.edit)
// router.delete('/delete/:id', deleteUser)

export { router as userAvailabilityRoutes }
