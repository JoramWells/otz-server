import express from 'express'
import { ClassRepository } from '../adapters/repositories/classRepository';
import { ClassInteractor } from '../application/interactors/classInteractor';
import { ClassController } from '../adapters/controllers/classController';
const repository = new ClassRepository();

const interactor = new ClassInteractor(repository);
const controller = new ClassController(interactor)

const router = express.Router();

router.post('/add', controller.onCreateClass.bind(controller))
router.get('/fetchAll', controller.onReadClasses.bind(controller))
router.get("/detail/:id", controller.onReadClassById.bind(controller));

module.exports = router
