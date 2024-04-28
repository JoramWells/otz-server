import express from 'express'
import { SchoolCategoryController } from '../adapters/controllers/schoolCategoryController';
import {SchoolCategoryRepository} from '../adapters/repositories/schoolCategoryRepository'
import {SchoolCategoryInteractor} from '../application/interactors/schoolCategoryInteractor'
const repository = new SchoolCategoryRepository();

const interactor = new SchoolCategoryInteractor(repository);
const controller = new SchoolCategoryController(interactor)

const router = express.Router();

router.post('/add', controller.onCreateSchoolCategory.bind(controller))
router.get('/fetchAll', controller.onReadSchoolCategories.bind(controller))
router.get("/detail/:id", controller.onReadSchoolCategoryById.bind(controller));

module.exports = router
