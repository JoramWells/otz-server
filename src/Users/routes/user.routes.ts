/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express'
import { UserController } from '../adapters/controllers/user.controller'

const router = express.Router()


const controller = new UserController()

router.post('/add', controller.create)
router.get('/fetchAll', controller.find)
router.get('/detail/:id', controller.findById)
router.post('/login', controller.login)
router.put("/edit/:id", controller.edit);
router.put("/edit-user-password/:id", controller.editPassword);
router.delete('/delete/:id', controller.delete);

// router.put('/edit/:id', editUser)
// router.delete('/delete/:id', deleteUser)

export { router as userRoutes }
