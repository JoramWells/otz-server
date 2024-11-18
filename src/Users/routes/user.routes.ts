/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { UserRepository } from '../adapters/repositories/userRepository'
import { UserInteractor } from '../application/interactors/userInteractor'
import { UserController } from '../adapters/controllers/userController'

const router = express.Router()

const repository = new UserRepository()
const interactor = new UserInteractor(repository)
const controller = new UserController(interactor)

router.post('/add', controller.onCreateUser.bind(controller))
router.get('/fetchAll', controller.onGetAllUsers.bind(controller))
router.get('/detail/:id', controller.onGetUserById.bind(controller))
router.post('/login', controller.login.bind(controller))
router.put("/edit/:id", controller.onEditPatientProfile.bind(controller));
router.put("/edit-user-password/:id", controller.onEditUserPassword.bind(controller));
router.delete('/delete/:id', controller.onDeleteUser.bind(controller));

// router.put('/edit/:id', editUser)
// router.delete('/delete/:id', deleteUser)

export { router as userRoutes }
