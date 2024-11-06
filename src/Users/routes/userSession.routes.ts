/* eslint-disable @typescript-eslint/no-misused-promises */


import express from 'express'
import { UserSessionLogRepository } from '../adapters/repositories/userSessionRepository'
import { UserSessionLogController } from '../adapters/controllers/userSessionLogController'
import { UserSessionInteractor } from '../application/interactors/userSessionInteractor'


const repository = new UserSessionLogRepository()
const interactor = new UserSessionInteractor(repository)

const controller = new UserSessionLogController(interactor)

const router = express.Router()

router.post('/add', controller.onCreateUserSessionLog.bind(controller))
router.get('/fetchAll', controller.onGetAllUserSessionLogs.bind(controller))
router.get('/detail/:id', controller.onGetUserSessionLogById.bind(controller))
router.put('/edit/:id', controller.onEditUserSessionLog.bind(controller))

router.delete('/delete/:id', controller.onDeleteUserSessionLog.bind(controller));

export {router as userSessionLogRouter}
