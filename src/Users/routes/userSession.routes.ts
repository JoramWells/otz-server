/* eslint-disable @typescript-eslint/no-misused-promises */


import express from 'express'
import { UserSessionLogController } from '../controllers/userSession.controller'



const controller = new UserSessionLogController()

const router = express.Router()

router.post('/add', controller.create)
router.get('/fetchAll', controller.find)
router.get('/detail/:id', controller.findById)
router.put('/edit/:id', controller.edit)

router.delete('/delete/:id', controller.delete);

export {router as userSessionLogRouter}
